export const Debug = ({ data }) =>
  data
    ? (
      <>
        <p>
          <button
            class="btn btn-dark"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
          >
            Show View Props
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </>
    )
    : <p>No data found</p>;

export default Debug;
