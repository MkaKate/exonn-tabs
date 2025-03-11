// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronUp } from "lucide-react";
// const initialTabs = [
//   { id: "1", title: "Lagerverwaltung", url: "/lageverwaltung" },
//   { id: "2", title: "Dashboard", url: "/dashboard" },
//   { id: "3", title: "Banking", url: "/banking" },
//   { id: "4", title: "Telefonie", url: "/telefonie" },
//   { id: "5", title: "Accounting", url: "/accounting" },
//   { id: "6", title: "Verkauf", url: "/verkauf" },
//   { id: "7", title: "Statistik", url: "/statistik" },
//   { id: "8", title: "Post Office", url: "/post-office" },
//   { id: "9", title: "Administration", url: "/administration" },
//   { id: "10", title: "Help", url: "/help" },
//   { id: "11", title: "Warenbestand", url: "/warenbestand" },
//   { id: "12", title: "Einkauf", url: "/einkauf" },
//   { id: "13", title: "Rechn", url: "/rechn" }
// ];
// export default function Tabs() {
//   const [tabs, setTabs] = useState([]);
//   const [visibleTabs, setVisibleTabs] = useState([]);
//   const [hiddenTabs, setHiddenTabs] = useState([]);
//   const [hoveredTab, setHoveredTab] = useState(null);
//   const containerRef = useRef(null);
//   const router = useRouter();
//   // Завантажуємо вкладки з localStorage при першому рендері
//   useEffect(() => {
//     const savedTabs = localStorage.getItem("tabs");
//     setTabs(savedTabs ? JSON.parse(savedTabs) : initialTabs);
//   }, []);
//   // Зберігаємо вкладки в localStorage при зміні
//   useEffect(() => {
//     localStorage.setItem("tabs", JSON.stringify(tabs));
//   }, [tabs]);
//   // Функція для приховування зайвих вкладок
//   useEffect(() => {
//     const adjustTabs = () => {
//       if (!containerRef.current) return;
//       const containerWidth = containerRef.current.clientWidth;
//       let totalWidth = 0;
//       let visible = [];
//       let hidden = [];
//       tabs.forEach((tab) => {
//         totalWidth += 120; // Припускаємо, що вкладка займає 120px
//         if (totalWidth < containerWidth - 50) {
//           visible.push(tab);
//         } else {
//           hidden.push(tab);
//         }
//       });
//       setVisibleTabs(visible);
//       setHiddenTabs(hidden);
//     };
//     adjustTabs();
//     window.addEventListener("resize", adjustTabs);
//     return () => window.removeEventListener("resize", adjustTabs);
//   }, [tabs]);
//   // Обробник перетягування вкладок
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const newTabs = Array.from(tabs);
//     const [movedTab] = newTabs.splice(result.source.index, 1);
//     newTabs.splice(result.destination.index, 0, movedTab);
//     setTabs(newTabs);
//   };
//   // Видалення вкладки
//   const handleDeleteTab = (id) => {
//     setTabs(tabs.filter((tab) => tab.id !== id));
//   };
//   return (
//     <div className="tabs-container flex items-center space-x-2 p-2 bg-gray-100 rounded-lg" ref={containerRef}>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable direction="horizontal" droppableId="tabs">
//           {(provided) => (
//             <div {...provided.droppableProps} ref={provided.innerRef} className="flex space-x-2">
//               {visibleTabs.map((tab, index) => (
//                 <Draggable key={tab.id} draggableId={tab.id} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="relative flex items-center px-4 py-2 bg-white rounded-md shadow cursor-pointer hover:bg-gray-200"
//                       onClick={() => router.push(tab.url)}
//                       onMouseEnter={() => setHoveredTab(tab.id)}
//                       onMouseLeave={() => setHoveredTab(null)}
//                     >
//                       <span>{tab.title}</span>
//                       {hoveredTab === tab.id && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteTab(tab.id);
//                           }}
//                           className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 bg-red-500 text-white rounded-full text-xs"
//                         >
//                           ❌
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       {hiddenTabs.length > 0 && (
//         <Menu as="div" className="relative">
//           <MenuButton className="p-2 border rounded bg-white shadow">
//             <ChevronUp size={20} />
//           </MenuButton>
//           <MenuItems className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
//             {hiddenTabs.map((tab) => (
//               <MenuItem key={tab.id}>
//                 {({ active }) => (
//                   <div
//                     onClick={() => router.push(tab.url)}
//                     className={`px-4 py-2 cursor-pointer ${active ? "bg-gray-200" : ""}`}
//                   >
//                     {tab.title}
//                   </div>
//                 )}
//               </MenuItem>
//             ))}
//           </MenuItems>
//         </Menu>
//       )}
//     </div>
//   );
// }
"use strict";
//# sourceMappingURL=Tabs.dev.js.map
