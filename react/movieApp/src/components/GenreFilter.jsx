export default function GenreFilter(props) {
    return (
    <select onChange={props.onChange}>
      <option value="">filter by genre</option>
    {props.genres.map((genre) => {
        return (
            <option value={genre}>{genre}</option>
        )
    })}
    </select>
    )
}