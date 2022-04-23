const useGenre = (selectedGenres) => {
    if(selectedGenres.length< 1) return "";

    const GenreID = selectedGenres.map((gen) => gen.id);
    return GenreID.reduce((acc,curr) => acc + "," + curr);
}

export default useGenre;