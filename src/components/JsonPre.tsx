// #region json pre
/** json pre */
export default function JsonPre(props: { data?: any }) {
  return <pre class="max-h-500px w-700px overflow-auto rd-2 bg-dark-2 p-2 text-sm text-light-2">{JSON.stringify(props.data, null, 2)}</pre>
}
// #endregion
