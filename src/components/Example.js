export default function Example(props) {
    props.setLocation("Example")

    var big = {
        fontSize: "20em",
    }

    return (
        <div style={big}>NOW BIG! This is an example component</div>
    )
}
