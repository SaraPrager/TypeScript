import Component from "./base-component";
import { autobind } from "../decorators/autobind";
import { Project } from "../models/project";
import { Draggable } from "../models/drag-drop";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    return `${this.project.people} ${
      this.project.people > 1 ? "persons" : "person"
    }`;
  }

  constructor(host_id: string, project: Project) {
    super("single-project", host_id, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent) {}

  configure() {
    this.new_element.addEventListener("dragstart", this.dragStartHandler);
    this.new_element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.new_element.querySelector("h2")!.textContent = this.project.title;
    this.new_element.querySelector(
      "h3"
    )!.textContent = `${this.persons} assigned`;
    this.new_element.querySelector("p")!.textContent = this.project.description;
  }
}
