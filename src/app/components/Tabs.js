"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronUp, XCircle, Folder } from "lucide-react";
import "../globals.css";

const initialTabs = [
  { id: "1", title: "Lagerverwaltung", url: "/lageverwaltung", icon: <Folder size={16} /> },
  { id: "2", title: "Dashboard", url: "/dashboard", icon: <Folder size={16} /> },
  { id: "3", title: "Banking", url: "/banking", icon: <Folder size={16} /> },
  { id: "4", title: "Telefonie", url: "/telefonie", icon: <Folder size={16} /> },
  { id: "5", title: "Accounting", url: "/accounting", icon: <Folder size={16} /> },
  { id: "6", title: "Verkauf", url: "/verkauf", icon: <Folder size={16} /> },
  { id: "7", title: "Statistik", url: "/statistik", icon: <Folder size={16} /> },
  { id: "8", title: "Post Office", url: "/post-office", icon: <Folder size={16} /> },
  { id: "9", title: "Administration", url: "/administration", icon: <Folder size={16} /> },
  { id: "10", title: "Help", url: "/help", icon: <Folder size={16} /> },
  { id: "11", title: "Warenbestand", url: "/warenbestand", icon: <Folder size={16} /> },
  { id: "12", title: "Einkauf", url: "/einkauf", icon: <Folder size={16} /> },
  { id: "13", title: "Rechn", url: "/rechn", icon: <Folder size={16} /> },
];

export default function Tabs() {
  const [tabs, setTabs] = useState([]);
  const [visibleTabs, setVisibleTabs] = useState([]);
  const [hiddenTabs, setHiddenTabs] = useState([]);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setTabs(initialTabs);
  }, []);

  useEffect(() => {
    const adjustTabs = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      let totalWidth = 0;
      let visible = [];
      let hidden = [];

      tabs.forEach((tab) => {
        totalWidth += 160;
        if (totalWidth < containerWidth - 50) {
          visible.push(tab);
        } else {
          hidden.push(tab);
        }
      });

      setVisibleTabs(visible);
      setHiddenTabs(hidden);
    };

    adjustTabs();
    window.addEventListener("resize", adjustTabs);
    return () => window.removeEventListener("resize", adjustTabs);
  }, [tabs]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTabs = Array.from(tabs);
    const [movedTab] = newTabs.splice(result.source.index, 1);
    newTabs.splice(result.destination.index, 0, movedTab);
    setTabs(newTabs);
  };

  const handleRemove = (id) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  return (
    <div className="tabs-container flex items-center bg-gray-200 border-t border-b border-gray-400 px-2" ref={containerRef}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable direction="horizontal" droppableId="tabs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex">
              {visibleTabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="tab flex items-center px-6 py-2 bg-white border-r border-gray-300 cursor-pointer relative hover:bg-gray-100"
                      onClick={() => router.push(tab.url)}
                      onMouseEnter={(e) => e.currentTarget.querySelector(".close-btn").classList.remove("hidden")}
                      onMouseLeave={(e) => e.currentTarget.querySelector(".close-btn").classList.add("hidden")}
                    >
                      {tab.icon}
                      <span className="ml-2">{tab.title}</span>
                      <XCircle
                        size={16}
                        className="close-btn hidden text-red-500 absolute right-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(tab.id);
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {hiddenTabs.length > 0 && (
        <Menu as="div" className="ml-0">
          <MenuButton className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 hover:bg-blue-500 hover:text-white transition">
            <ChevronUp size={20} />
          </MenuButton>
          <MenuItems className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-300">
            {hiddenTabs.map((tab) => (
              <MenuItem key={tab.id}>
                {({ active }) => (
                  <div
                    className={`px-4 py-2 flex items-center cursor-pointer ${active ? "bg-gray-200" : "bg-white"}`}
                    onClick={() => router.push(tab.url)}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.title}</span>
                  </div>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      )}
    </div>
  );
}