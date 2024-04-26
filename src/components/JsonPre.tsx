// #region json pre
/** json pre */
export default function JsonPre(props: { data?: any }) {
  return <pre class="max-h-500 w-700 overflow-auto rd-6 bg-dark-2 p-16 text-16 text-light-2">{JSON.stringify(props.data, null, 2)}</pre>
}
// #endregion
