import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener_function: Listener<T>) {
    this.listeners.push(listener_function);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static _instance: ProjectState;
  private constructor() {
    super();
  }

  static getInstance(): ProjectState {
    if (!this._instance) {
      this._instance = new ProjectState();
    }
    return this._instance;
  }

  addProject(title: string, description: string, people: number) {
    const new_project = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );

    this.projects.push(new_project);

    this.updateListeners();
  }

  moveProject(project_id: string, new_status: ProjectStatus) {
    const project = this.projects.filter(
      (project) => project.id === project_id
    )[0];
    if (project && project.status !== new_status) {
      project.status = new_status;
      this.updateListeners();
    }
  }

  private updateListeners() {
    this.listeners.forEach((listener) => {
      listener(this.projects.slice());
    });
  }
}

ProjectState.getInstance();
