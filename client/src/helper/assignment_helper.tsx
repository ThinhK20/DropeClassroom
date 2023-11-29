export interface Assigment {
  assingmentId: string;
  assigmentName: string;
  assigmentDescription: string;
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
    .then((data: any) => {
      console.log(data);
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
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const createAssignment = async (assignment: Assigment) => {
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
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const updateAssignment = async (assignment: Assigment) => {
  await fetch(`http://localhost:8000/assignment/${assignment.assingmentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignment),
  })
    .then((res: any) => {
      return res.json();
    })
    .then((data: any) => {
      console.log(data);
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
    .then((data: any) => {
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
