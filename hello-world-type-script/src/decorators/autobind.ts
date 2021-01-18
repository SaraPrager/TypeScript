export function autobind(
  _target: any,
  _method_name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original_method = descriptor.value;
  return {
    configurable: true,
    get() {
      return original_method.bind(this);
    },
  };
}
