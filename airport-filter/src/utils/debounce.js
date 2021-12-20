////// Here we are defining debounce function which is taking two arguments 1st callback function & 2nd one is delay timer
export default function debounce(func, timer) {
  ////// creating one timeoutPoiner varible
  let timeoutPoiner;
  // debugger;
  return function() {
    ///// creating two varibales 1st one is context which is storing global this object and 2nd one is two arguemnts i.e.., callback function & timer
    let context = this;
    let args = arguments;
    //// clearTimeout is callback function for clearing existing setTimerout function timer 
    clearTimeout(timeoutPoiner);
    ///// Here we are storing setTimeout function along with timer function inside timeoutPoiner variable global variable. Inside setTimeout function, we called func.call() method,,, there are 3 methods come with callback function i.e.., apply(), bind(), call()
    timeoutPoiner = setTimeout(() => func.call(context, args), timer);
  };
}
