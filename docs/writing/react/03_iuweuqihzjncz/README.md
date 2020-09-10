<auth-auth />

## React Redux 的概念与意义

`react` 应用程序很快就会变得复杂起来，`react` 毕竟只是一个视图层框架。负责吧数据渲染成 `dom` 元素，它是专家，但现实中，应用程序涉及到大量的用户交互、网络请求，修改数据的频率就会变得很高，我们需要一种规范来约束对数据的更新，使得任何修改都可被追踪，这样才能为复杂的应用程序提供良好的调试性能和可扩展能力。


`redux` 用来实现可控，可依赖，可追溯的数据流管理和数据容器管理，它就是一个数据流、数据容器管理工具，数据流说白了就是修改视图的途径，以什么样的形态来表达对数据的改动，以及包括如何组织数据之间的关系。`redux` 没有提供任何面向对象编程风格的 `api`，全是函数式的、柯里化。

<br/>
<br/>
<br/>

**Redux 三大原则**

- **单一数据源**

  - 应用程序的所有数据，都挂载在同一个对象下面，方便管理

  - 同一信息的数据，只有一份，避免不同步

- **状态不可变**

  - 修改数据前后，数据源不再是同一个对象

  - 为什么这么设计呢？主要考虑到可以实现应用程序状态的保存，实现时间旅行的功能，还可以避免存在不按照规定去直接修改数据源的行为

- **纯函数修改状态**

  - 纯函数没有副作用，不依赖外部变量，同样的输入，产生同样的输出，也是幂等的。有点像 react 的渲染行为。

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 没有 Redux 的世界

🌰

- 1、什么情况下使用 useCallback

  - 使用：当一个函数当参数传递的时候，或者不想让其句柄发生变化的时候

  - 不使用：当一个函数没有当参数传递的时候，不关心句柄变化的时候

- 2、当在写一个 todos 列表的时候，它的每一条数据都用单独的组件渲染出来，这样才不至于个别成员数据的变化，导致全部成员重渲染

- 3、useEffect 的顺序也要特别注意，是从上往下执行的

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'

let idSeq = Date.now()
const TODOS_KEY = '_$-TODO_'

/**
 * 函数组件记得使用 memo
 */
const Control = memo(function Control(props) {
  const { addTodo } = props

  // 获取 dom 元素
  const inputRef = useRef()

  // 这里的 onSubmit 并没有向任何子组件中传递，所以没有必要用 useCallback 包裹
  const onSubmit = e => {
    e.preventDefault()

    const _input = inputRef.current
    const newText = _input.value.trim()

    if (newText.length === 0) return

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    _input.value = ''
  }

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text"
               ref={inputRef}
               className='new-todo'
               placeholder='What need to be done?'
        />
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props

  const onChange = () => toggleTodo(id)
  const onRemove = () => removeTodo(id)

  return (
    <li className='todo-item'>
      <input type="checkbox"
             onChange={onChange}
             checked={complete}/>

      <label className={complete ? 'complete' : ''}>{text}</label>

      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props

  return (
    // 在这种情况下，它的每一条数据都用单独的组件渲染出来，这样才不至于个别成员数据的变化，导致全部成员重渲染
    <ul>
      {
        todos.map(todo => {
          return <TodoItem todo={todo}
                           key={todo.id}
                           removeTodo={removeTodo}
                           toggleTodo={toggleTodo}/>
        })
      }
    </ul>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([])

  /**
   * 1、使用 useCallback() 包裹，避免每次渲染产生新的句柄，它也不依赖任何状态，setState 是不需要放在依赖数组中的
   * 2、传入一个函数，函数的方式直接避免对 todos 变量的依赖
   */
  const addTodo = useCallback(todo => {
    setTodos(todos => [...todos, todo])
  }, [])

  const removeTodo = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  const toggleTodo = useCallback(id => {
    setTodos(todos => todos.map(todo => todo.id === id
      ? { ...todo, complete: !todo.complete }
      : todo
    ))
  }, [])

  /**
   * 1、useEffect 的顺序也要特别注意，是从上往下执行的
   * 2、只需要在初始化调用一次
   */
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY))
    setTodos(todos)
  }, [])

  /**
   * 1、当 todos 发生变化时，需要将其存到 localStorage 中，所以将 todos 放在依赖数组中
   */
  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control addTodo={addTodo}/>
      <Todos todos={todos}
             removeTodo={removeTodo}
             toggleTodo={toggleTodo}/>
    </div>
  )
}

export default TodoList;
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Dispatch 与 Action

🌰

**1、初认识 Action、Dispatch**

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'

let idSeq = Date.now()
const TODOS_KEY = '_$-TODO_'

const Control = memo(function Control(props) {
  const { dispatch } = props
  const inputRef = useRef()

  const onSubmit = e => {
    e.preventDefault();

    const _input = inputRef.current
    const newText = _input.value.trim()

    if (newText.length === 0) return

    dispatch({
      type: 'add',
      payload: {
        id: ++idSeq,
        text: newText,
        complete: false
      }
    })

    _input.value = ''
  }

  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text"
               ref={inputRef}
               className='new-todo'
               placeholder='What need to be done?'/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, dispatch } = props

  const onChange = () => dispatch({ type: 'toggle', payload: id })
  const onRemove = () => dispatch({ type: 'remove', payload: id })

  return (
    <li className='todo-item'>
      <input type="checkbox"
             onChange={onChange}
             checked={complete}/>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, dispatch } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem todo={todo}
                           key={todo.id}
                           dispatch={dispatch}/>
        })
      }
    </ul>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([])

  /**
   * 为了让更新数据的方式变得透明，现在有一种方案
   *
   *  1、用一种纯对象方式，来表达对数据的更新操作，这个对象称之为 Action
   *    {
   *      type: '用来描述对数据进行什么样的操作',
   *      paload: '执行这个操作需要什么额外的数据'
   *    }
   *
   *  2、让每一个 Action 都经过一个中心节点函数，在这个函数里面我们就能够集中处理一些副作用
   *
   *  3、编写 dispatch 方法，它的核心思想
   *    ① 让所有对数据的操作都经过这个函数，由他同一更新。
   *    ② 其他不说，至少可以在一个位置统一拦截、debug 操作、...
   */
  const dispatch = useCallback(action => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        break
      case 'add':
        // payload 代表 todo
        setTodos(todos => [...todos, payload])
        break
      case 'remove':
        // payload 代表 id
        setTodos(todos => todos.filter(todo => todo.id !== payload))
        break
      case 'toggle':
        setTodos(todos => todos.map(todo => todo.id === payload ? { ...todo, complete: !todo.complete } : todo))
        break;
      default:
        break;
    }
  }, []) // 目前为止，dispatch 除了 setTodos 之外，没有依赖任何变量，所以依赖数组为空

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
    dispatch({ type: 'set', payload: todos })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control dispatch={dispatch}/>
      {/* 直接传入 dispatch，省去了之前分开传入的方法 */}
      <Todos dispatch={dispatch} todos={todos}/>
    </div>
  );
}

export default TodoList;
```

<br/>
<br/>
<br/>

🌰

**2、抽取 action**

`action.js`

```jsx
/**
 * 在 App.js 中每次 dispatch 都需要手动构建一个 action 对象，且 action 就只有两个固定的字段
 * 为了避免每次都写，我们可以把构造操作用函数表示
 **/

const createSet = payload => ({ type: 'set', payload })

const createAdd = payload => ({ type: 'add', payload })

const createRemove = payload => ({ type: 'remove', payload })

const createToggle = payload => ({ type: 'toggle', payload })

export {
  createSet,
  createAdd,
  createRemove,
  createToggle
}
```

<br/>

`App.js`

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { createAdd, createRemove, createSet, createToggle } from "./action";

let idSeq = Date.now()
const TODOS_KEY = '_$-TODO_'

const Control = memo(function Control(props) {
  const { dispatch } = props
  const inputRef = useRef()

  const onSubmit = e => {
    e.preventDefault();

    const _input = inputRef.current
    const newText = _input.value.trim()

    if (newText.length === 0) return

    // 修改
    dispatch(createAdd({
      id: ++idSeq,
      text: newText,
      complete: false
    }))

    _input.value = ''
  }

  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text"
               ref={inputRef}
               className='new-todo'
               placeholder='What need to be done?'/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, dispatch } = props

  // 修改
  const onChange = () => dispatch(createToggle(id))
  // 修改
  const onRemove = () => dispatch(createRemove(id))

  return (
    <li className='todo-item'>
      <input type="checkbox"
             onChange={onChange}
             checked={complete}/>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, dispatch } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem todo={todo}
                           key={todo.id}
                           dispatch={dispatch}/>
        })
      }
    </ul>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([])

  const dispatch = useCallback(action => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        break
      case 'add':
        setTodos(todos => [...todos, payload])
        break
      case 'remove':
        setTodos(todos => todos.filter(todo => todo.id !== payload))
        break
      case 'toggle':
        setTodos(todos => todos.map(todo => todo.id === payload
          ? { ...todo, complete: !todo.complete }
          : todo
        ))
        break;
      default:
        break;
    }
  }, [])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
    // 修改
    dispatch(createSet(todos))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control dispatch={dispatch}/>
      <Todos dispatch={dispatch} todos={todos}/>
    </div>
  );
}

export default TodoList;
```

<br/>
<br/>
<br/>


🌰

**2、抽取 bindActionCreators**

`action.js` 同上

`App.js`

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { createAdd, createRemove, createSet, createToggle } from "./action";

let idSeq = Date.now()
const TODOS_KEY = '_$-TODO_'

const bindActionCreators = (actionCreators, dispatch) => {
  const ret = {}

  for (let key in actionCreators) {
    // ...args: 传入的 payload 值可能 ( 一个，多个，没有 )
    ret[key] = (...args) => {
      // action.js 中创建 action 的方法
      const actionCreator = actionCreators[key]

      // 将传入的 payload 值，放入到 action.js 中的创建方法，得到一个完整的 action
      const action = actionCreator(...args)

      dispatch(action)
    }
  }

  // 最后返回一个对象，方便 ... 展开，所以适合向子组件传递 数据的更新函数 { 'functionName':  }
  return ret
}

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = e => {
    e.preventDefault();

    const _input = inputRef.current
    const newText = _input.value.trim()

    if (newText.length === 0) return

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    _input.value = ''
  }

  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text"
               ref={inputRef}
               className='new-todo'
               placeholder='What need to be done?'/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props

  // 修改
  const onChange = () => toggleTodo(id)
  // 修改
  const onRemove = () => removeTodo(id)

  return (
    <li className='todo-item'>
      <input type="checkbox"
             onChange={onChange}
             checked={complete}/>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem todo={todo}
                           key={todo.id}
                           removeTodo={removeTodo}
                           toggleTodo={toggleTodo}/>
        })
      }
    </ul>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([])

  const dispatch = useCallback(action => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        break
      case 'add':
        setTodos(todos => [...todos, payload])
        break
      case 'remove':
        setTodos(todos => todos.filter(todo => todo.id !== payload))
        break
      case 'toggle':
        setTodos(todos => todos.map(todo => todo.id === payload
          ? { ...todo, complete: !todo.complete }
          : todo
        ))
        break;
      default:
        break;
    }
  }, [])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
    // 修改
    dispatch(createSet(todos))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control {
                 ...bindActionCreators({
                   addTodo: createAdd
                 }, dispatch)
               }
      />

      <Todos {
               ...bindActionCreators({
                 removeTodo: createRemove,
                 toggleTodo: createToggle
               }, dispatch)
             }
             todos={todos}/>
    </div>
  );
}

export default TodoList;
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 使用 Reducer 拆解数据更新

🌰

**1、初识 reducer**

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { createAdd, createRemove, createSet, createToggle } from "./action";

let idSeq = Date.now()
const TODOS_KEY = '_$-TODO_'

const bindActionCreators = (actionCreators, dispatch) => {
  const ret = {}

  for (let key in actionCreators) {
    ret[key] = (...args) => {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }

  return ret
}

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = e => {
    e.preventDefault();

    const _input = inputRef.current
    const newText = _input.value.trim()

    if (newText.length === 0) return

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    _input.value = ''
  }

  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text"
               ref={inputRef}
               className='new-todo'
               placeholder='What need to be done?'/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props

  // 修改
  const onChange = () => toggleTodo(id)
  // 修改
  const onRemove = () => removeTodo(id)

  return (
    <li className='todo-item'>
      <input type="checkbox"
             onChange={onChange}
             checked={complete}/>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem todo={todo}
                           key={todo.id}
                           removeTodo={removeTodo}
                           toggleTodo={toggleTodo}/>
        })
      }
    </ul>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([])
  // 1、新增一段逻辑，在 todos 发生变化时，incrementCount 自增
  const [incrementCount, setIncrementCount] = useState(0)


  /**
   * 2、'set'、'add'，都是执行了 setIncrementCount()
   *     ① 现在出现了多个 action 中有共同的逻辑，且要重复编码实现，这是因为按照 action 的维度，来执行的数据更新逻辑
   *     ② 这些操作无非都是更新数据，那可以尝试以数据的维度，来执行的数据更新逻辑
   */
  /*
  const dispatch = useCallback(action => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        setIncrementCount(c => c + 1)
        break
      case 'add':
        setTodos(todos => [...todos, payload])
        setIncrementCount(c => c + 1)
        break
      case 'remove':
        setTodos(todos => todos.filter(todo => todo.id !== payload))
        break
      case 'toggle':
        setTodos(todos => todos.map(todo => todo.id === payload
          ? { ...todo, complete: !todo.complete }
          : todo
        ))
        break;
      default:
        break;
    }
  }, [])
  */

  /**
   * 3、它接受一个当前数据和 action，返回通过这个 action 更新之后的数据
   */
  const reducer = (state, action) => {
    const { type, payload } = action
    const { todos, incrementCount } = state

    switch (type) {
      case 'set':
        return {
          ...state,
          todos: payload,
          incrementCount: incrementCount + 1
        }
      case 'add':
        return {
          ...state,
          todos: [...todos, payload],
          incrementCount: incrementCount + 1
        }
      case 'remove':
        return {
          ...state,
          todos: todos.filter(todo => todo.id !== payload)
        }
      case 'toggle':
        return {
          ...state,
          todos: todos.map(todo => todo.id === payload
            ? { ...todo, complete: !todo.complete }
            : todo
          )
        }
    }
    return state
  }

  /**
   * 4、对于 dispatch 来说，它就不需要亲自处理 action 了，这里就依赖了 todos，incrementCount。将它们添加到依赖数组中
   */
  const dispatch = useCallback(action => {
    const state = { todos, incrementCount }
    const setters = { todos: setTodos, incrementCount: setIncrementCount }
    const newState = reducer(state, action)
    for (let key in newState) setters[key](newState[key])
  }, [todos, incrementCount])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
    // 修改
    dispatch(createSet(todos))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control {
                 ...bindActionCreators({
                   addTodo: createAdd
                 }, dispatch)
               }
      />

      <Todos {
               ...bindActionCreators({
                 removeTodo: createRemove,
                 toggleTodo: createToggle
               }, dispatch)
             }
             todos={todos}/>
    </div>
  );
}

export default TodoList;
```

<br/>
<br/>
<br/>

**2、从数据角度去优化 reducer**

`reducers.js`

```jsx
const combineReducers = reducers => (state, action) => {
  const changed = []

  for (let key in reducers) {
    changed[key] = reducers[key](state[key], action)
  }
  console.log(changed);
  return { ...state, ...changed }
}

const reducers = {
  todos(state, action) {
    const { type, payload } = action
    switch (type) {
      case 'set':
        return payload
      case 'add':
        return [...state, payload]
      case 'remove':
        return state.filter(todo => todo.id !== payload)
      case 'toggle':
        return state.map(todo => todo.id === payload
          ? { ...todo, complete: !todo.complete }
          : todo
        )
    }
    return state
  },
  incrementCount(state, action) {
    const { type } = action
    switch (type) {
      case 'set':
      case 'add':
        return state + 1
    }
    return state
  }
}

const reducer = combineReducers(reducers)

export default reducer
```

<br/>

`App.js`

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { createAdd, createRemove, createSet, createToggle } from "./action";
import reducer from "./reducers";

let idSeq = Date.now()
const TODOS_KEY = '_$-TODO_'

const bindActionCreators = (actionCreators, dispatch) => {
  const ret = {}

  for (let key in actionCreators) {
    ret[key] = (...args) => {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }

  return ret
}

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = e => {
    e.preventDefault();

    const _input = inputRef.current
    const newText = _input.value.trim()

    if (newText.length === 0) return

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })

    _input.value = ''
  }

  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text"
               ref={inputRef}
               className='new-todo'
               placeholder='What need to be done?'/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props

  const onChange = () => toggleTodo(id)
  const onRemove = () => removeTodo(id)

  return (
    <li className='todo-item'>
      <input type="checkbox"
             onChange={onChange}
             checked={complete}/>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem todo={todo}
                           key={todo.id}
                           removeTodo={removeTodo}
                           toggleTodo={toggleTodo}/>
        })
      }
    </ul>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  /*
  const reducer = (state, action) => {
    const { type, payload } = action
    const { todos, incrementCount } = state

    switch (type) {
      case 'set':
        return {
          ...state,
          todos: payload,
          incrementCount: incrementCount + 1
        }
      case 'add':
        return {
          ...state,
          todos: [...todos, payload],
          incrementCount: incrementCount + 1
        }
      case 'remove':
        return {
          ...state,
          todos: todos.filter(todo => todo.id !== payload)
        }
      case 'toggle':
        return {
          ...state,
          todos: todos.map(todo => todo.id === payload
            ? { ...todo, complete: !todo.complete }
            : todo
          )
        }
    }
    return state
  }
  */

  const dispatch = useCallback(action => {
    const state = { todos, incrementCount }
    const setters = { todos: setTodos, incrementCount: setIncrementCount }
    // 1、从 reducers.js 中引入 reducer
    const newState = reducer(state, action)
    for (let key in newState) setters[key](newState[key])
  }, [todos, incrementCount])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
    // 修改
    dispatch(createSet(todos))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control {
                 ...bindActionCreators({
                   addTodo: createAdd
                 }, dispatch)
               }
      />

      <Todos {
               ...bindActionCreators({
                 removeTodo: createRemove,
                 toggleTodo: createToggle
               }, dispatch)
             }
             todos={todos}/>
    </div>
  );
}

export default TodoList;
```

<br/>
<br/>
<br/>

到此为止，已经了解了 dispatch、action、reducer 三个概念，通过在 dispatch 中，调用 reducer，并传入 action 的方式，就能实现不同数据字段独立解耦的消费action，但这是同步的逻辑。下面就看看异步的 action

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 异步 Action

`action.js`

```jsx
/**
 * 给 dispatch 增加了处理函数的能力，允许 actionCreators 返回一个函数，而不单单是一个纯对象
 *
 * function 需要经过 dispatch 本身，来允许发起下一次的 action。以及一个 state，允许我们根据当前的数据状态来决定下一步的 action
 *
 * 由于是异步 action ，所以在异步回调之后，我们还是访问的旧版本的 state，这是无意思的，因此，我们通过函数参数来获取当前最新的 state
 *
 * 由于在组件的上下文中，我们无法在过去的渲染周期中，获取到组价最新的 state，所以只要将 state 同步到组件上下文之外，构成了一个 store 对象
 *
 */

let idSeq = Date.now()

const createSet = payload => ({ type: 'set', payload })

/**
 * 1、添加一段逻辑：避免重复的 todo 出现，这时候返回的不在是一个纯对象，而是一个函数
 *
 * 2、函数的参数 dispatch、getState ( fu 返回的是最新的 state )
 *
 * 3、由于这里返回了一个 function，App.js 中的 dispatch 是不识别函数的，需要改造一下
 */
const createAdd = text => (dispatch, getState) => {

  // 模拟异步
  setTimeout(() => {
    const { todos } = getState()

    // 添加一段逻辑：避免重复的 todo 出现
    if (!todos.find(todo => todo.text === text)) {
      dispatch({
        type: 'add',
        payload: {
          id: ++idSeq,
          text,
          complete: false
        }
      })
    }

  }, 3000)
}

const createRemove = payload => ({ type: 'remove', payload })

const createToggle = payload => ({ type: 'toggle', payload })

export {
  createSet,
  createAdd,
  createRemove,
  createToggle
}
```

<br/>

`reducers.js`

```jsx
const combineReducers = reducers => (state, action) => {
  const changed = []

  for (let key in reducers) {
    changed[key] = reducers[key](state[key], action)
  }
  console.log(changed);
  return { ...state, ...changed }
}

const reducers = {
  todos(state, action) {
    const { type, payload } = action
    switch (type) {
      case 'set':
        return payload
      case 'add':
        return [...state, payload]
      case 'remove':
        return state.filter(todo => todo.id !== payload)
      case 'toggle':
        return state.map(todo => todo.id === payload
          ? { ...todo, complete: !todo.complete }
          : todo
        )
    }
    return state
  },
  incrementCount(state, action) {
    const { type } = action
    switch (type) {
      case 'set':
      case 'add':
        return state + 1
    }
    return state
  }
}

const reducer = combineReducers(reducers)

export default reducer
```

<br/>

`App.js`

```jsx
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import { createAdd, createRemove, createSet, createToggle } from "./action";
import reducer from "./reducers";

const TODOS_KEY = '_$-TODO_'

const bindActionCreators = (actionCreators, dispatch) => {
  const ret = {}

  for (let key in actionCreators) {
    ret[key] = (...args) => {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }

  return ret
}

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = e => {
    e.preventDefault();

    const _input = inputRef.current
    const newText = _input.value.trim()

    if (newText.length === 0) return

    addTodo(newText)
    _input.value = ''
  }

  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type="text"
               ref={inputRef}
               className='new-todo'
               placeholder='What need to be done?'/>
      </form>
    </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props

  const onChange = () => toggleTodo(id)
  const onRemove = () => removeTodo(id)

  return (
    <li className='todo-item'>
      <input type="checkbox"
             onChange={onChange}
             checked={complete}/>
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem todo={todo}
                           key={todo.id}
                           removeTodo={removeTodo}
                           toggleTodo={toggleTodo}/>
        })
      }
    </ul>
  )
})

// 2、创建一个全局 store
const store = {
  todos: [],
  incrementCount: 0
}

function TodoList() {
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  // 3、同步数据到 store 中
  useEffect(() => {
    Object.assign(store, { todos, incrementCount })
  }, [todos, incrementCount])

  // 5、既然不在依赖 todos, incrementCount，那么依赖数组也没必要存在了，useCallback也没有存在的必要了
  const dispatch = /*useCallback(*/action => {
    // const state = { todos, incrementCount }
    const setters = { todos: setTodos, incrementCount: setIncrementCount }


    /**
     * 判断 action 的类型，是一个 Fn，还是一个纯对象
     * 1、由于这个 state 总是在发起异步之前的 state，而不是最新的
     *    ① 那么只要在组件的上下文中，就没有办法获取最新的 state
     *    ② 为了能拿到最新的 state 的句柄，那么只能将这个 state 定义在外层
     */
    if (typeof action === 'function') {
      // 4、function ( 使用 store )，调用 function，传入 dispatch、store
      action(dispatch, () => store)
      return
    }

    // 4、纯对象 ( 使用 store )
    const newState = reducer(store, action)
    for (let key in newState) setters[key](newState[key])
  }/*, [todos, incrementCount])*/

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
    // 修改
    dispatch(createSet(todos))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control {
                 ...bindActionCreators({
                   addTodo: createAdd
                 }, dispatch)
               }
      />

      <Todos {
               ...bindActionCreators({
                 removeTodo: createRemove,
                 toggleTodo: createToggle
               }, dispatch)
             }
             todos={todos}/>
    </div>
  );
}

export default TodoList;
```


<br/>
<br/>
<br/>

总结

- **state**

  - 只维护一个 `store` 树，这个数下存储各个模块的 `state`

- **dispatch**

  - 触发一个修改 `state` 的操作，有且只能通过 `dispatch` 触发修改，它的参数是一个 `action`

- **action**

  - `action` 表示当前 `dispatch (操作)` 的 `type (类型)` 和 `payload (数据)`
  - 例如设置一个数值，那么这个 `action` 将这么定义 `{ type: 'add', payload: 1 }`

- **reducer**

  - 一个纯函数，用来修改 `state`，接受两个参数 `state` 和 `action`，最后返回一个全新的 `state`












