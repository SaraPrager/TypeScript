import Component from "./base-component";
import { ProjectState } from "../state/project-state";
import { autobind } from "../decorators/autobind";
import { validate } from "../utils/validation";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  title_input: HTMLInputElement;
  description_input: HTMLInputElement;
  people_input: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.title_input = this.new_element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.description_input = this.new_element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.people_input = this.new_element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  renderContent() {}

  configure() {
    this.new_element.addEventListener("submit", this.onSubmit);
  }

  @autobind
  private onSubmit(event: Event) {
    event.preventDefault();
    const user_input = this.gatherUserInput();
    if (Array.isArray(user_input)) {
      const [title, desc, people] = user_input;
      console.log(`title${title}, desc${desc}, people${people}`);
      ProjectState.getInstance().addProject(title, desc, people);
      this.clearInput();
    }
  }

  private clearInput() {
    this.title_input.value = "";
    this.description_input.value = "";
    this.people_input.value = "";
  }

  private gatherUserInput(): [string, string, number] | undefined {
    const title_text = this.title_input.value;
    const description_text = this.description_input.value;
    const people_text = this.people_input.value;
    if (
      !validate({ value: title_text, required: true }) ||
      !validate({ value: description_text, required: true, min_length: 5 }) ||
      !validate({ value: people_text, required: true, min: 1, max: 5 })
    ) {
      alert("Invalid Input");
      return undefined;
    }
    return [title_text, description_text, +people_text];
  }
}
