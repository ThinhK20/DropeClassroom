import { useEffect, useState } from "react";
import { Avatar, Divider } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

interface Person {
  id: number;
  name: string;
  email: string;
  age: number;
  avatar: string;
  role: string;
}

const People: Person[] = [
  {
    id: 1,
    name: "John Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Teacher",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Student",
  },
  {
    id: 3,
    name: "John Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Teacher",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Student",
  },
  {
    id: 5,
    name: "John Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Teacher",
  },
  {
    id: 6,
    name: "Jane Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Student",
  },
  {
    id: 7,
    name: "John Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Teacher",
  },
  {
    id: 8,
    name: "Jane Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Student",
  },
  {
    id: 9,
    name: "John Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Teacher",
  },
  {
    id: 10,
    name: "Jane Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Student",
  },
  {
    id: 11,
    name: "John Doe",
    email: "",
    age: 20,
    avatar: "https://i.pravatar.cc/300",
    role: "Teacher",
  },
];

export default function ListPeople() {
  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Teacher</h1>
            <button className="btn btn-primary">
              <PersonAddAltIcon />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {People.map(
              (person) =>
                person.role === "Teacher" && (
                  <div className="flex flex-col items-center">
                    <Avatar
                      alt={person.name}
                      src={person.avatar}
                      sx={{ width: 56, height: 56 }}
                    />
                    <h1 className="text-lg font-bold">{person.name}</h1>
                    <h1 className="text-sm">{person.role}</h1>
                  </div>
                )
            )}
          </div>
        </div>
        <Divider />
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Student</h1>
            <button className="btn btn-primary">
              <PersonAddAltIcon />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {People.map(
              (person) =>
                person.role === "Student" && (
                  <div className="flex flex-col items-center">
                    <Avatar
                      alt={person.name}
                      src={person.avatar}
                      sx={{ width: 56, height: 56 }}
                    />
                    <h1 className="text-lg font-bold">{person.name}</h1>
                    <h1 className="text-sm">{person.role}</h1>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
