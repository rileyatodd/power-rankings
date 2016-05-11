// (a -> a) -> (a -> a)
export function logInputs(f){
  return (...args) => {
    console.log(...args)
    f(...args)
  } 
}