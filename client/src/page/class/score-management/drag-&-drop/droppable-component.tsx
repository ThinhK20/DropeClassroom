/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   DragDropContext,
   DropResult,
   Droppable,
   ResponderProvided,
} from "react-beautiful-dnd";

export const DroppableComponent =
   (onDragEnd: (result: DropResult, provided: ResponderProvided) => void) =>
   (props: any) => {
      return (
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"1"} direction="horizontal">
               {(provided) => {
                  return (
                     <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        {...props}
                     >
                        {props.children}
                        {provided.placeholder}
                     </div>
                  );
               }}
            </Droppable>
         </DragDropContext>
      );
   };
