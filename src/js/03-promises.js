import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onCreatePromisesClick);

function onCreatePromisesClick(event) {
  event.preventDefault();

  let delay = event.target.delay.value * 1;
  let step = event.target.step.value * 1;
  let amount = event.target.amount.value;

  for (let i = 1; i <= amount; i += 1) {
     
      createPromise(i, delay)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
      console.log(delay += step);
  };
  
   event.currentTarget.reset();
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
       resolve({position, delay});
      } else {
       reject({position, delay})
    }
    }, delay)
  });
}
