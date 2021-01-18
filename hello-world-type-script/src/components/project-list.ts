import Component from "./base-component";
import { autobind } from "../decorators/autobind";
import { ProjectState } from "../state/project-state";
import { Project, ProjectStatus } from "../models/project";
import { DragTarget } from "../models/drag-drop";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assigned_projects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.new_element.querySelector("ul")!.classList.add("droppable");
    }
  }

  @autobind
  dragLeaveHandler(_event: DragEvent) {
    this.new_element.querySelector("ul")!.classList.remove("droppable");
  }

  @autobind
  dropHandler(event: DragEvent) {
    const project_id = event.dataTransfer!.getData("text/plain");
    ProjectState.getInstance().moveProject(
      project_id,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  configure() {
    this.new_element.addEventListener("dragover", this.dragOverHandler);
    this.new_element.addEventListener("dragleave", this.dragLeaveHandler);
    this.new_element.addEventListener("drop", this.dropHandler);

    ProjectState.getInstance().addListener((projects: Project[]) => {
      this.assigned_projects = projects.filter((project) => {
        return this.type === "active"
          ? project.status === ProjectStatus.Active
          : project.status === ProjectStatus.Finished;
      });
      this.renderProjects();
    });
  }

  renderContent() {
    this.new_element.querySelector("ul")!.id = `${this.type}-projects-list`;
    this.new_element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private renderProjects() {
    const list_element = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    list_element.innerHTML = "";
    this.assigned_projects.forEach((project) => {
      new ProjectItem(this.new_element.querySelector("ul")!.id, project);
    });
  }
}
