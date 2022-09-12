import { useState } from "preact/hooks";

export const Debug = ({ data }) => {
  const [open, setOpen] = useState(false);
  return data
    ? (
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="mb-4">
          <button
            class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            onClick={(_e) => {
              setOpen((current) => !current);
            }}
          >
            {open ? `Hide` : `Show`} View Props
          </button>
        </p>
        <div class={open ? `` : `hidden`} id="collapseExample">
          <div class="bg-white border rounded p-3">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    )
    : (
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="mb-4">No developer data found</p>
      </div>
    );
};

export default Debug;
