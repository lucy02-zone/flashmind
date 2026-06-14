import {
  useEffect,
  useState
} from "react";

import {
  getSummaries
} from "../services/summaryService";

const SummariesPage = () => {

  const [
    summaries,
    setSummaries
  ] = useState([]);

  useEffect(() => {

    loadSummaries();

  }, []);

  const loadSummaries =
    async () => {

      try {

        const data =
          await getSummaries();

        console.log(data);

        setSummaries(
          data.summaries || []
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <div>

      <h1>
        Summaries
      </h1>

      {
        summaries.length === 0 ? (
          <p>
            No summaries found
          </p>
        ) : (
          summaries.map(
            summary => (
              <div
                key={summary.id}
                style={{
                  border:
                    "1px solid #ddd",
                  padding:
                    "15px",
                  marginBottom:
                    "15px"
                }}
              >
                <p>
                  {summary.summary}
                </p>
              </div>
            )
          )
        )
      }

    </div>
  );

};

export default SummariesPage;