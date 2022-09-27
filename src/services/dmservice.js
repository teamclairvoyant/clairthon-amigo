import TreeItem from "@mui/lab/TreeItem";


export default function transformTreeData(documentList) {
    let transformedData = [];
    Object.entries(documentList)?.map(object => {

        let category = object[0];
        let tempChildren = object[1];
        let children = [];
        tempChildren.map(value => {
            children.push({
                id: value,
                name: value,
            })
        })
        transformedData.push({
            id: "disabled" + category,
            children: children,
            name: category
        })


    });
    console.log("getTreeItemsFromData", transformedData)
    var nodes = {
        id: "disabled-Documents",
        name: "Documents",
        children: transformedData,
    }

    return renderTree(nodes);
};

const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
    </TreeItem>
);


