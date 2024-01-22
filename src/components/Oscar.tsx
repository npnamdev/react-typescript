type OscarProps = {
    children: React.ReactNode
}

const Oscar = (props: OscarProps) => {
    return (
        <div style={{backgroundColor: 'blue', color: '#fff'}}>{props.children}</div>
    )
}

export default Oscar;