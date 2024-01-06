import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { StudentAssignment } from './schemas/student-assignment.schema';
import { StudentAssignmentDto } from './dto/student-assignment.dto';
import { Assignment } from 'src/shared/schemas/assignment.schema';
import { UserClassroom } from 'src/user-classroom/schemas/user-classroom.schema';

@Injectable()
export class StudentAssignmentService {
  constructor(
    @InjectModel(StudentAssignment.name)
    private studentAssignmentModel: mongoose.Model<StudentAssignment>,
    @InjectModel(Assignment.name)
    private assignmentModel: mongoose.Model<Assignment>,
    @InjectModel(UserClassroom.name)
    private userClassroomModel: mongoose.Model<UserClassroom>,
  ) {}

  async createNewAssignment(
    assignmentDTO: StudentAssignmentDto,
  ): Promise<StudentAssignment> {
    const res = await this.studentAssignmentModel.create(assignmentDTO);
    return res;
  }

  async getAssignmentAll(): Promise<StudentAssignment[]> {
    const assignments = await this.studentAssignmentModel
      .find()
      .populate('studentId');
    return assignments;
  }

  async getAllAssignmentsByClassId(id: string): Promise<StudentAssignment[]> {
    const assignments = await this.assignmentModel.find({
      assignmentClassId: id,
    });
    if (!assignments) return [];
    const assignmentPromises = assignments.map(async (assignment) => {
      const studentAssignments = await this.studentAssignmentModel
        .find({
          assignmentId: assignment._id,
        })
        .populate([
          {
            path: 'studentId',
            populate: [
              {
                path: 'userId',
              },
            ],
          },
          {
            path: 'assignmentId',
          },
        ]);
      return [...studentAssignments];
    });

    const result = await Promise.all(assignmentPromises);

    return result.flat();
  }

  async getAllAssignmentsGroupByClassId(id: string): Promise<any> {
    const assignments = await this.assignmentModel.find({
      assignmentClassId: { $eq: id },
    });

    const result = await Promise.all(
      assignments.map(async (assignment) => {
        const objectId = {};
        const studentAssignments = await this.studentAssignmentModel.find({
          assignmentId: assignment.id,
        });

        objectId[assignment.id] = studentAssignments;

        return objectId;
      }),
    );

    const combineResult = result.reduce((acc, obj) => ({ ...acc, ...obj }), {});

    return combineResult;
  }

  async getAllGroupStudentAssignmentsByClassId(id: string): Promise<any> {
    const assignments = await this.assignmentModel.find({
      assignmentClassId: { $eq: id },
    });
    if (!assignments) throw new NotFoundException('Assignment not found');
    const studentAssignments = await this.getAllAssignmentsGroupByClassId(id);

    const existedGroupIds = [] as string[];
    const averageScores = assignments.map((assignment) => {
      const group = studentAssignments[assignment._id.toString()];
      // Calculate total score
      if (group) {
        const totalScore = group.reduce(
          (sum: number, assignment: StudentAssignment) =>
            sum + assignment.grade,
          0,
        );

        // Calculate average score
        const averageScore = totalScore / group.length;

        existedGroupIds.push(assignment._id.toString());
        return {
          assignmentId: assignment,
          averageScore,
          studentAssignments: group,
        };
      }
    });

    const otherGroups = assignments
      .filter((x) => existedGroupIds.indexOf(x._id as any) !== -1)
      .map((x) => ({
        assignmentId: x,
        averageScore: 0,
        studentAssignments: [],
      }));

    const result1 = [...averageScores, ...otherGroups];

    const mergedData = result1.reduce((acc: any, item) => {
      item.studentAssignments.forEach((studentAssignment) => {
        const existingItem = acc.find(
          (x) =>
            studentAssignment.studentId.toString() === x.studentId.toString(),
        );
        studentAssignment.assignmentId = item.assignmentId;

        if (existingItem) {
          existingItem.assignments.push({
            assignmentId: studentAssignment.assignmentId,
            averageScore: item.averageScore || 0,
            createdAt: studentAssignment.createdAt,
            grade: studentAssignment.grade || 0,
            isActive: studentAssignment.isActive,
            status: studentAssignment.status,
            studentId: studentAssignment.studentId,
            updatedAt: studentAssignment.updatedAt,
            _id: studentAssignment._id,
          });
        } else {
          acc.push({
            studentId: studentAssignment.studentId,
            assignments: [
              {
                assignmentId: studentAssignment.assignmentId,
                averageScore: item.averageScore || 0,
                createdAt: studentAssignment.createdAt,
                grade: studentAssignment.grade || 0,
                isActive: studentAssignment.isActive,
                status: studentAssignment.status,
                studentId: studentAssignment.studentId,
                updatedAt: studentAssignment.updatedAt,
                _id: studentAssignment._id,
              },
            ],
          });
        }
      });

      return acc;
    }, []);

    return mergedData;
  }

  async getAssignmentById(
    id: mongoose.Schema.Types.ObjectId,
  ): Promise<StudentAssignment> {
    const assignment = await this.studentAssignmentModel.findById({ _id: id });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async deleteAssignmentById(id: string): Promise<StudentAssignment> {
    const assignment = await this.studentAssignmentModel.findByIdAndDelete(id);
    return assignment;
  }

  async updateAssignmentById(
    id: any,
    assignmentDTO: StudentAssignment,
  ): Promise<StudentAssignment> {
    const updatedAssignment =
      await this.studentAssignmentModel.findOneAndUpdate(
        { _id: id },
        assignmentDTO,
      );
    if (!updatedAssignment)
      throw new NotFoundException('Student assignment not found');
    return updatedAssignment;
  }

  async updateAssignmentByAssignmentIdAndStudentId(
    assignmentDTO: StudentAssignment,
  ): Promise<StudentAssignment> {
    const updatedAssignment =
      await this.studentAssignmentModel.findOneAndUpdate(
        {
          assignmentId: assignmentDTO.assignmentId,
          studentId: assignmentDTO.studentId,
        },
        assignmentDTO,
      );
    if (!updatedAssignment)
      throw new NotFoundException('Student assignment not found');
    return updatedAssignment;
  }

  async createStudentAssignmentsByStudentId(
    studentId: string,
  ): Promise<boolean> {
    const assigments = await this.assignmentModel.find();
    const promises = assigments.forEach(async (assignment) => {
      const studentAssigment = this.studentAssignmentModel.findOne({
        assignmentId: assignment._id,
        studentId: studentId,
      });
      if (studentAssigment === null) {
        await this.studentAssignmentModel.create({
          assignmentId: assignment._id,
          studentId: studentId,
        });
      }
    });

    await Promise.all([promises]);
    return true;
  }
}
