export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  template_element: HTMLTemplateElement;
  host_element: T;
  new_element: U;

  constructor(
    template_id: string,
    host_id: string,
    insert_at_start: boolean,
    new_element_id?: string
  ) {
    this.template_element = document.getElementById(
      template_id
    )! as HTMLTemplateElement;
    this.host_element = document.getElementById(host_id)! as T;

    const imported_node = document.importNode(
      this.template_element.content,
      true
    );
    this.new_element = imported_node.firstElementChild as U;
    if (new_element_id) {
      this.new_element.id = new_element_id;
    }

    this.attach(insert_at_start);
  }

  private attach(insert_at_start: boolean) {
    this.host_element.insertAdjacentElement(
      insert_at_start ? "afterbegin" : "beforeend",
      this.new_element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
