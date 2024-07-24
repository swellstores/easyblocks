import { NoCodeComponentProps } from "@swell/easyblocks-core";

function Code({
  children,
  Wrapper,
}: NoCodeComponentProps & Record<string, any>) {
  return <Wrapper.type {...Wrapper.props}>{children}</Wrapper.type>;
}

export { Code };
