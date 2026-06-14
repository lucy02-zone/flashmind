import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

const AnalyticsPage = () => {

  const [
    analytics,
    setAnalytics
  ] = useState(null);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics =
    async () => {

      const response =
        await api.get(
          "/analytics"
        );

      setAnalytics(
        response.data.analytics
      );

    };

  if (!analytics) {

    return (
      <h2>
        Loading...
      </h2>
    );

  }

  return (
    <div>

      <h1>
        Analytics
      </h1>

      <h3>
        Files:
        {" "}
        {analytics.files}
      </h3>

      <h3>
        Flashcards:
        {" "}
        {analytics.flashcards}
      </h3>

      <h3>
        Quizzes:
        {" "}
        {analytics.quizzes}
      </h3>

      <h3>
        Summaries:
        {" "}
        {analytics.summaries}
      </h3>

      <h3>
        Revision Plans:
        {" "}
        {analytics.revisionPlans}
      </h3>

    </div>
  );

};

export default AnalyticsPage;