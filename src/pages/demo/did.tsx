import { useParams } from '@solidjs/router'

export interface DidProps {}
/**  */
export default function Did(props: DidProps) {
  const param = useParams()
  return <div>id = {param.id}</div>
};
