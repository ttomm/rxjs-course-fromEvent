import { fromEvent, fromEventPattern, Observable, Observer } from 'rxjs';

const triggerButton = document.querySelector('button#trigger');

fromEvent<MouseEvent>(triggerButton, 'click').subscribe((e: MouseEvent) =>
  console.log(`Mouse event: ${e.type} ${e.x} ${e.y}`)
);

//------------------------------------------------------------------

const observer: Observer<MouseEvent> = {
  next: (e: MouseEvent) =>
    console.log(`Mouse old event: ${e.type} ${e.x} ${e.y}`),
  error: (err) => console.log('Event error:', err),
  complete: () => console.log('Event completed'),
};

const observable$ = new Observable((subscriber) => {
  const clickHandlerFn = (e) => subscriber.next(e);
  triggerButton.addEventListener('click', clickHandlerFn);

  return () => {
    triggerButton.removeEventListener('click', clickHandlerFn);
  };
});

const subscription$ = observable$.subscribe(observer);

setTimeout(() => subscription$.unsubscribe(), 5000);
