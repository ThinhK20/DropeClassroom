/* eslint-disable @typescript-eslint/no-explicit-any */
import { Draggable } from "react-beautiful-dnd";

export const DraggableComponent =
   (id: string, index: number) => (props: any) => {
      return (
         <Draggable draggableId={id} index={index}>
            {(provided) => (
               <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  {...props}
               >
                  {props.children}
               </div>
            )}
         </Draggable>
      );
   };
