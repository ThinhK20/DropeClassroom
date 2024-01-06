/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, TextareaAutosize } from "@mui/material";
import { GradeReview } from "../../../../models/GradeReview";
import { Comment } from "../../../../models/Comment";
import { useEffect, useState } from "react";
import {
   addCommentApi,
   getAllCommentsByGradeReviewIdApi,
} from "../../../../apis/commentsApis";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../hooks/hooks";

interface Props {
   gradeReview?: GradeReview;
}

export default function CommentBox(props: Props) {
   const [content, setContent] = useState<string>("");
   const [comments, setComments] = useState<Comment[]>([]);
   const currentUserClassroom = useAppSelector(
      (state) => state.userClassroom.currentUserClassroom
   );
   function handleAddComment() {
      if (!content || content.trim().length === 0) return;

      const userClassroomId = currentUserClassroom?._id?.toString();
      if (!userClassroomId) {
         toast.error("User classroom not found ! Please try again.");
         return;
      }
      const submitData = {
         content: content.trim(),
         gradeReview: props.gradeReview?._id,
         userClassroom: userClassroomId,
      } as Record<keyof Comment, string>;

      addCommentApi(submitData)
         .then(() => {
            setContent("");
            fetchComments();
         })
         .catch((ex) => toast.error(ex));
   }

   function fetchComments() {
      if (!props.gradeReview) return;
      getAllCommentsByGradeReviewIdApi(props.gradeReview?._id).then((res) => {
         setComments(res.data);
      });
   }

   useEffect(() => {
      fetchComments();
   }, []);

   return (
      <div className="w-full">
         <div className=" rounded-2xl px-10 shadow-lg border hover:shadow-2xl transition duration-500">
            <div className="mt-4">
               <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
                  Comments
               </h1>
               <div className="my-4">
                  <TextareaAutosize
                     className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     minRows={3}
                     value={content}
                     onKeyDown={(e) => {
                        if (e.code === "Enter") handleAddComment();
                     }}
                     onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="mt-4 gap-4 flex items-center justify-end">
                     <Button variant="contained" onClick={handleAddComment}>
                        Submit
                     </Button>
                     <Button variant="text" onClick={() => setContent("")}>
                        Clear
                     </Button>
                  </div>
               </div>
               {comments
                  .sort(
                     (a, b) =>
                        new Date(b.createdAt!).valueOf() -
                        new Date(a.createdAt!).valueOf()
                  )
                  .map((comment) => (
                     <div className="flex justify-between items-center w-full">
                        <div className="mt-4 flex items-center space-x-4 py-6">
                           <div className="">
                              <img
                                 className="w-12 h-12 rounded-full object-cover"
                                 src={
                                    comment.userClassroom.userId?.avatar ||
                                    "https://preview.redd.it/komari-hikikomari-kyuuketsuki-no-monmon-v0-f5r1niv03vsb1.jpg?auto=webp&s=acbcf059295aa959fe4cafb73afa0af1b151e290"
                                 }
                                 alt=""
                              />
                           </div>
                           <div className="flex flex-col ">
                              <div className="text-sm font-semibold">
                                 {comment.userClassroom.userId?.username} •
                                 <span className="font-normal ml-2">
                                    {comment.createdAt &&
                                       new Date(
                                          comment.createdAt
                                       ).toLocaleString()}
                                 </span>
                              </div>
                              <p>{comment.content}</p>
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </div>
   );
}
