import './App.css'

export default function Search({ setSearch, search, activeFilter, setActiveFilter }) {

  return (
    <>
      <div className="searchContainer">
        <input type="text" className="searchBar" placeholder='Search To-Do..' value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className="moreFilter">
        {
          <>
            <button onClick={() => setActiveFilter('all')} className={activeFilter === 'all' ? 'all active' : 'all'}>All</button>
            <button onClick={() => setActiveFilter('completed')} className={activeFilter === 'completed' ? 'completed active' : 'completed'}>Completed</button>
            <button onClick={() => setActiveFilter('pending')} className={activeFilter === 'pending' ? 'pending active' : 'pending'}>Pending</button>
          </>
        }
      </div>
    </>
  )
}