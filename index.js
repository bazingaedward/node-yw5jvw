const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require('tapable');

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
      brake: new SyncHook(['hello', 'world', 'test']),
      calculateRoutes: new AsyncParallelHook([
        'source',
        'target',
        'routesList',
      ]),
    };
  }
}

const myCar = new Car();

// myCar.hooks.brake.tap('Plugin2', (speed) => console.log(speed, 12));
// // Use the tap method to add a consument
myCar.hooks.brake.tap('WarningLampPlugin', (...args) =>
  console.log(...args, 11)
);
// myCar.hooks.brake.call('spped', 'world');
// myCar.hooks.brake.call('spped2');

// SyncLoopHook
// let idx = 0;
// const a = new SyncLoopHook();
// a.tap('p1', () => {
//   while (idx++ < 5) {
//     console.log('p1', idx);
//     return idx;
//   }
// });
// a.tap('p2', () => {
//   console.log('p2');
// });
// a.call();

// AsyncParallelHook
// const a = new AsyncParallelHook();
// a.tapPromise('p1', () => {
//   return new Promise((r) => {
//     setTimeout(() => {
//       console.log('p1');
//       r();
//     }, 2000);
//   });
// });

// a.tapPromise('p2', () => {
//   return new Promise((r) => {
//     setTimeout(() => {
//       console.log('p2');
//       r();
//     }, 2000);
//   });
// });

// a.promise().then(() => {
//   console.log('finish');
// });

// AsyncParallelBailHook
// const a = new AsyncParallelBailHook();
// a.tapAsync('p1', (r) => {
//   setTimeout(() => {
//     console.log('p1');
//     r(1);
//   }, 2000);
// });

// a.tapAsync('p2', (r) => {
//   setTimeout(() => {
//     console.log('p2');
//     r();
//   }, 4000);
// });

// a.callAsync(() => {
//   console.log('finish');
// });

// AsyncSeriesHook
const a = new AsyncSeriesHook();
a.tapPromise('p1', () => {
  return new Promise((r) => {
    setTimeout(() => {
      console.log('p1');
      r();
    }, 2000);
  });
});

a.tapPromise('p2', () => {
  return new Promise((r) => {
    setTimeout(() => {
      console.log('p2');
      r();
    }, 2000);
  });
});

a.promise().then(() => {
  console.log('finish');
});
