import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { StudentAssignment } from './schemas/student-assignment.schema';
import { StudentAssignmentDto } from './dto/student-assignment.dto';
import { Assignment } from 'src/shared/schemas/assignment.schema';

@Injectable()
export class StudentAssignmentService {
  constructor(
    @InjectModel(StudentAssignment.name)
    private studentAssignmentModel: mongoose.Model<StudentAssignment>,
    @InjectModel(Assignment.name)
    private assignmentModel: mongoose.Model<Assignment>,
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
    const assignment = await this.assignmentModel.findOne({
      assignmentClassId: id,
    });
    if (!assignment) return [];
    const studentAssignments = await this.studentAssignmentModel
      .find({
        assignmentId: assignment._id,
      })
      .populate('studentId');
    return studentAssignments;
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
          assignmentId: assignment._id.toString(),
          averageScore,
          studentAssignments: group,
        };
      }
    });

    const otherGroups = assignments
      .filter((x) => existedGroupIds.indexOf(x._id as any) !== -1)
      .map((x) => ({
        assignmentId: x._id,
        averageScore: 0,
        studentAssignments: [],
      }));

    const result1 = [...averageScores, ...otherGroups];

    const mergedData = result1.reduce((acc: any, item) => {
      const existingItem = acc.find(
        (x) =>
          x.studentId?.toString() ===
          item.studentAssignments[0].studentId?.toString(),
      );

      if (existingItem) {
        existingItem.assignments.push({
          assignmentId: item.assignmentId,
          averageScore: item.averageScore || 0,
          createdAt: item.studentAssignments[0].createdAt,
          grade: item.studentAssignments[0].grade || 0,
          isActive: item.studentAssignments[0].isActive,
          status: item.studentAssignments[0].status,
          studentId: item.studentAssignments[0].studentId,
          updatedAt: item.studentAssignments[0].updatedAt,
          _id: item.studentAssignments[0]._id,
        });
      } else {
        acc.push({
          studentId: item.studentAssignments[0]?.studentId,
          assignments: [
            {
              assignmentId: item.assignmentId,
              averageScore: item.averageScore || 0,
              createdAt: item.studentAssignments[0]?.createdAt,
              grade: item.studentAssignments[0]?.grade || 0,
              isActive: item.studentAssignments[0]?.isActive,
              status: item.studentAssignments[0]?.status,
              studentId: item.studentAssignments[0]?.studentId,
              updatedAt: item.studentAssignments[0]?.updatedAt,
              _id: item.studentAssignments[0]?._id,
            },
          ],
        });
      }

      return acc;
    }, []);

    return mergedData;
  }

  async getAssignmentById(
    id: mongoose.Schema.Types.ObjectId,
  ): Promise<StudentAssignment> {
    const assignment = await this.studentAssignmentModel
      .findById(id)
      .populate('studentId');
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
      await this.studentAssignmentModel.findOneAndUpdate(assignmentDTO);
    if (!updatedAssignment)
      throw new NotFoundException('Student assignment not found');
    return updatedAssignment;
  }
}
