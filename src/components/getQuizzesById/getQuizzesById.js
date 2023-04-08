import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';

const routingFunction = (param) => {
  const history = useHistory();

  history.push({
    pathname: '/NotFound',
    state: param,
  });
};

async function getQuizzesById(quizzesId, setQuizzes) {
  try {
    managerService.getQuizzesById(quizzesId).then((Quizzes) => {
      const quizzes = {
        _id: Quizzes._id,
        title: Quizzes.title,
        description: Quizzes.description,
        options: Quizzes.options,
        alreadyVoted: Quizzes.alreadyVoted,
        toVote: Quizzes.toVote,
      };
      setQuizzes(quizzes);
    });
  } catch (error) {
    routingFunction();
  }
}

export default getQuizzesById;
