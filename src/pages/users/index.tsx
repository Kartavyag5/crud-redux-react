import { useState } from "react";
interface Node {
  root: string;
  child?: Node[];
}

const Tree = () => {
  const sdata: Node[] = [
    {
      root: "branch1",
      child: [{ root: "sub11" }, { root: "sub12" }],
    },
    {
      root: "branch2",
      child: [{ root: "sub21" }, { root: "sub22" }],
    },
    {
      root: "branch3",
      child: [
        { root: "sub31" },
        { root: "sub32" },
        { root: "sub33", child: [{ root: "sub331" }, { root: "sub332" }] },
      ],
    },
  ];

  let arr: String[] = ["scale", "happy", "strength", "peace", "happy", "happy"];

  function removeDuplicates(arr: String[]) {
    return arr.filter((item: String, index) => arr.indexOf(item) === index);
  }

  const testDup = (arr: String[]) => {
    let Uarr: String[] = [];
    for (let i = 0; i < arr.length; i++) {
      let isDup = false;
      for (let j = 0; j < Uarr.length; j++) {
        if (arr[i] === arr[j]) {
          Uarr.push(arr[i]);
          isDup = true;
          break;
        }
      }
      if (isDup) {
        Uarr[Uarr.length] = arr[i];
        return;
      }
    }
    return Uarr;
  };

  console.log("test", testDup(arr));

  const [cBranch, setCbranch] = useState<string>("");
  const [data, setData] = useState(sdata);
  const [child, setChild] = useState<string>("");

  const parentHandler = (data: Node[]) => {
    return data.map((node) => (
      <li key={node.root}>
        {node.root}
        {node.child && <ul>{parentHandler(node.child)}</ul>}
      </li>
    ));
  };

  const rootReturn: any = (data: Node[]) => {
    return data.map((node: Node) => (
      <>
        <option value={node.root}>{node.root}</option>
        {node.child && rootReturn(node.child)}
      </>
    ));
  };

  const addBranch = (branch: string, data: Node[], child: string) => {
    data.map((i) => {
      if (i.root === branch) {
        const obj = { root: child };
        if (i.child) {
          i.child.push(obj);
          return i;
        } else {
          i.child = [obj];
          return i;
        }
      } else {
        if (i.child) {
          addBranch(branch, i.child, child);
          return i;
        }
      }
    });
  };

  return (
    <>
      <h1>Tree</h1>
      <select onChange={(e) => setCbranch(e.currentTarget.value)}>
        {rootReturn(data)}
      </select>
      <input
        placeholder="select root & Enter new branchname"
        onChange={(e) => setChild(e.target.value)}
      />
      <button
        onClick={() => {
          addBranch(cBranch, data, child);
          setChild("");
        }}
      >
        add branch
      </button>
      <ul>{parentHandler(data)}</ul>
    </>
  );
};

export default Tree;
