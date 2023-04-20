import { useState } from 'react';

export function proxy(initialValue) {
  let forceUpdate;
  const rendered = new Set();

  return new Proxy(initialValue, {
    get(target, prop) {
      rendered.add(prop);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (prop === 'forceUpdate') {
        forceUpdate = value;
        return false;
      }

      if (Reflect.get(target, prop) === value) {
        return true; // no change do not update
      }

      const result = Reflect.set(target, prop, value);
      const isRendered = rendered.has(prop);

      if (result && isRendered && forceUpdate) {
        rendered.clear(); // recalculate rendered
        forceUpdate((count) => count + 1);
      }

      return result;
    },
  });
}

export function useSnapshot(proxy) {
  const [_, forceUpdate] = useState(0);

  Reflect.set(proxy, 'forceUpdate', forceUpdate);

  return proxy;
}

/**
  在JavaScript中，Proxy是一个内置类，它提供了一种机制来拦截并自定义对象上的基本操作，
  例如读取属性、写入属性和调用方法。通过使用Proxy，我们可以修改对象的默认行为，以便更好地控制代码的行为。

  Proxy类的语法如下：
  const proxy = new Proxy(target, handler);

  其中，target是要代理的目标对象，handler是一个包含代理对象操作的方法的对象。
  通过在handler对象上定义特定的方法，我们可以拦截和自定义代理对象上的操作。

  例如，以下是一个简单的示例，它使用Proxy拦截对象的读取属性操作：
  const obj = {
    name: "John",
    age: 30
  };
  const proxy = new Proxy(obj, {
    get(target, prop) {
      console.log(`Getting ${prop} property`);
      return target[prop];
    },
    set(target, prop, value) {
      console.log(`Setting ${prop} property to ${value}`);
      target[prop] = value;
      return true;
    }
  });
  console.log(proxy.name); // Getting name property, John
  在上面的示例中:
    我们定义了一个 get 方法和一个 set 方法，它们分别用于拦截代理对象的读取和属性设置操作。
    当我们读取代理对象上的属性时，代理会输出一条日志，显示获取的属性名称。
    当我们在代理对象上设置一个属性时，代理会输出一条日志，显示设置的属性名称和值。然后，它将设置的值分配给目标对象，并返回 true 表示设置操作已成功。
    当我们将 age 属性设置为 35 时，代理会输出一条日志，并将值分配给目标对象。
    然后，我们再次读取代理对象上的 age 属性，它将返回目标对象上的值 35，并输出一条日志，显示获取的属性名称。
 */
