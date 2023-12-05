export interface Assignment {
  _id: object;
  assignmentName: string;
  assignmentDescription: string;
  assignmentDueDate: Date;
  assignmentStatus: string;
  assignmentCreatedBy: string;
  assignmentUpdatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  assignmentGrade: number;
  assignmentGradeComment: string;
  assignmentPercentage: number;
}

export const getAllAssignments = async () => {
  await fetch("http://localhost:8000/assignment", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res: any) => {
      return res.json();
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getAssignment = async (id: string) => {
  await fetch(`http://localhost:8000/assignment/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res: any) => {
      return res.json();
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const createAssignment = async (assignment: Assignment) => {
  await fetch("http://localhost:8000/assignment/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignment),
  })
    .then((res: any) => {
      return res.json();
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const updateAssignment = async (assignment: Assignment) => {
  await fetch(`http://localhost:8000/assignment/${assignment._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignment),
  })
    .then((res: any) => {
      return res.json();
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const deleteAssignment = async (id: string) => {
  await fetch(`http://localhost:8000/assignment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res: any) => {
      return res.json();
    })
    .catch((err: any) => {
      console.log(err);
    });
};
