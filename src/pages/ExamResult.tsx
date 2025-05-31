import NavbarSite from "../Components/NavbarSite";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

interface QuestionResult {
  studentAnswer: string;
  correctAnswer: string;
  questionId: number;
  questionText: string;
  correct: boolean;
}

interface ExamResultData {
  examId: number;
  studentId: number;
  totalQuestions: number;
  percentage: number;
  questionResults: QuestionResult[];
  generalComments: string;
  examTitle: string;
  studentName: string;
  score: number;
}

function ExamResult() {
  const { examId } = useParams();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("studentId");
  const [examResult, setExamResult] = useState<null | ExamResultData>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/exams/results/${examId}?studentId=${studentId}`
        );
        if (!response.ok)
          throw new Error("Error al obtener los resultados del examen");

        const result = await response.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          setExamResult(result.data[0]);
        } else if (!Array.isArray(result.data)) {
          setExamResult(result.data);
        } else {
          setExamResult(null);
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching exam result:", err);
      } finally {
        setLoading(false);
      }
    };
    if (examId && studentId) {
      fetchExamResult();
    }
  }, [examId, studentId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <NavbarSite page={"Exam > Results"} />
      <div className="flex flex-col items-center justify-center">
        {loading && <p className="text-gray-600">Cargando...</p>}
        {error && (
          <p className="text-red-600">
            Error al cargar los resultados del examen
          </p>
        )}
        {examResult ? (
          <div className="bg-black shadow-md rounded-lg p-6 mt-4 border-2 border-yellow-600">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-5xl font-bold mb-2 mr-8 text-yellow-600">
                Resultados del examen
              </h2>
              <img
                src="https://cdn-icons-png.flaticon.com/512/9913/9913579.png"
                alt="results"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              {examResult.examTitle}
            </h3>
            <p className="text-gray-300 font-bold">
              Estudiante:
              <p className="text-gray-300">{examResult.studentName}</p>
            </p>
            <p className="text-gray-300 font-bold">
              Puntaje: {examResult.score}
            </p>
            <p className="text-gray-300 font-bold">
              Porcentaje: {examResult.percentage}%
            </p>
            <p className="text-gray-300 font-bold">
              Comentarios: {examResult.generalComments}
            </p>
            <h4 className="text-lg font-semibold mt-4">
              Resultados por pregunta:
            </h4>
            <ul className="list-disc pl-6">
              {examResult.questionResults.length > 0 ? (
                <li className="text-gray-300 font-bold mb-2">
                  Total de preguntas: {examResult.totalQuestions}
                </li>
              ) : (
                <li className="text-gray-300 font-bold mb-2">
                  No hay preguntas disponibles
                </li>
              )}
              {examResult.questionResults.length > 0 ? (
                <li className="text-gray-300 font-bold mb-2">
                  Resultados por pregunta:
                </li>
              ) : (
                <li className="text-gray-300 font-bold mb-2">
                  No hay resultados por pregunta
                </li>
              )}
              {examResult.questionResults.map((question) => (
                <li key={question.questionId} className="mb-4">
                  <p className="text-gray-400">
                    <strong>Pregunta:</strong> {question.questionText}
                  </p>
                  <p className="text-gray-400">
                    <strong>Tu respuesta:</strong> {question.studentAnswer}
                  </p>
                  <p className="text-gray-400">
                    <strong>Respuesta correcta:</strong>{" "}
                    {question.correctAnswer}
                  </p>
                  <p
                    className={`font-bold ${
                      question.correct ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {question.correct ? "Correcta" : "Incorrecta"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="card mt-4 bg-white shadow-md rounded-lg p-6">
            <div className="card-overlay"></div>
            <div className="card-inner">No results match</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamResult;
