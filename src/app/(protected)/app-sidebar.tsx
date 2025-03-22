"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, useSidebar
} from "@/components/ui/sidebar";
import { LayoutDashboard, Bot, Presentation, CreditCard, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {useState} from "react";


const Items =[
  {
    title: "Dashboard",
    url:"/dashboard",
    icon:LayoutDashboard
  },
  {
    title:"Q&A",
    url:"/qa",
    icon:Bot,
  },
  {
    title:"Meetings",
    url:"/meetings",
    icon:Presentation,
  },
]

const projects = [
  {
    id:"1",
    name:"New Project",
    url:"/project/new",
    icon:Plus
  },
  {
    id:"2",
    name:"Project 1",
    url:"/project/1",
    icon:Plus
  }


]

export function AppSideBar(){
  const pathname = usePathname();
  const {open} = useSidebar();
  const [projectId,setProjectId] = useState<string | undefined>(undefined)

  return(
    <Sidebar collapsible="icon" variant='floating'>
      <SidebarHeader>
        <Logo modalOpen={open}/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Application
          </SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {Items.map((item)=>{
                return(
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className={cn({
                        '!bg-primary !text-white':pathname === item.url
                      },'list-none')}>
                        <item.icon/>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Your Courses
          </SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {projects?.map((project)=>{
                return(
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div onClick={()=>setProjectId(project.id)}>
                        <div className={cn("rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary",
                          {
                            'bg-primary text-white':project.id === projectId
                          })}>
                          {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
              <div className="h-2"></div>
              {open && (
                <SidebarMenuItem>
                  <Link href="/create">
                    <Button size="sm" variant="outline" >
                      <Plus/>
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}