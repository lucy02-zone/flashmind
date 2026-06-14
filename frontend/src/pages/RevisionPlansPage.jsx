import {
  useEffect,
  useState
} from "react";

import {
  getPlans
} from "../services/revisionPlanService";

const RevisionPlansPage = () => {

  const [
    plans,
    setPlans
  ] = useState([]);

  useEffect(() => {

    loadPlans();

  }, []);

  const loadPlans =
    async () => {

      try {

        const data =
          await getPlans();

        setPlans(
          data.plans || []
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <div>

      <h1>
        Revision Plans
      </h1>

      {
        plans.length === 0 ? (
          <p>
            No plans found
          </p>
        ) : (
          plans.map(
            plan => (
              <div
                key={plan.id}
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
                  {plan.plan}
                </p>
              </div>
            )
          )
        )
      }

    </div>
  );

};

export default RevisionPlansPage;