var headers = [ "Book", "Author", "Language", "Published", "Sales"];var data = [  ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"],  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],  ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"],  ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],  ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],];var Excel = React.createClass({  propTypes: {    headers: React.PropTypes.arrayOf( //Проверка на тип данных - масив      React.PropTypes.string //Проверка на внутренний тип данных - строка    ),    initialData: React.PropTypes.arrayOf(      React.PropTypes.arrayOf(          React.PropTypes.string      )    ),  },  getInitialState: function() {    return {      data: this.props.initialData,      sortby: null,      descending: false,      edit: null, // {row: index, cell: index}      search: false,    };  },  _sort: function(e) {    var column = e.target.cellIndex,      data = this.state.data.slice();    var descending = this.state.sortby === column && !this.state.descending;    data.sort(function(a, b) {      return descending        ? (a[column] < b[column] ? 1 : -1)        : (a[column] > b[column] ? 1 : -1);    });    this.setState({      data: data,      sortby: column,      descending: descending,    });  },  _showEditor: function(e) {    this.setState({      edit: {        row: parseInt(e.target.dataset.row, 10),        cell: e.target.cellIndex,      }    });  },  _save: function(e) {    e.preventDefault();    var input = e.target.firstChild;    data[this.state.edit.row][this.state.edit.cell] = input.value;    this.setState({      edit: null, // редактирование выполнено      data: data,    });  },  _preSearchData: null,  _toggleSearch: function() {    if (this.state.search) {      this.setState({        data: this._preSearchData,        search: false,      });      this._preSearchData = null;    } else {        this._preSearchData = this.state.data;        this.setState({          search: true,        });      }  },  _search: function(e) {    var needle = e.target.value.toLowerCase();    if (!needle) { // строка поиска будет удалена      this.setState({data: this._preSearchData});      return;    }    var index = e.target.dataset.index; // в каком столбце искать    var searchdata = this._preSearchData.filter(function(row) {      return row[index].toString().toLowerCase().indexOf(needle)        > -1;  });    this.setState({data: searchdata});  },  render: function() {    return (      React.DOM.div({        className: 'table-wrap',      },        this._renderToolBar(),        this._renderTable(),      )    );  },  _renderToolBar: function() {    return(      React.DOM.button({        onClick: this._toggleSearch,        className: 'toolbar-btn',      },      'search')    )  },  _renderSearch: function() {    if (!this.state.search) {      return null;    }    return (      React.DOM.tr({onChange: this._search},        this.props.headers.map(function(_ignore, index) {          return React.DOM.td({key: index},            React.DOM.input({              type: 'text',              'data-index': index,            })          );        })      )    )  },  _renderTable: function() {    return (      React.DOM.table({        className: this.props.tableClass,      },        React.DOM.thead({          onClick: this._sort        },          React.DOM.tr(null,            this.props.headers.map(function(title, index) {              return React.DOM.th({                key: index              }, title)            })          )        ),        React.DOM.tbody({          onDoubleClick: this._showEditor,          },          this._renderSearch(),          this.state.data.map(function(row, rowindex) {            return (              React.DOM.tr({key: rowindex},                row.map(function(cell, cellindex) {                  var content = cell;                  var edit = this.state.edit;                  var data = this.state.data.slice();                  if (edit && edit.row === rowindex && edit.cell === cellindex) {// если существует изменения, и индексы совподают                    content = React.DOM.form({onSubmit: this._save},                      React.DOM.input({                        type: 'text',                        defaultValue: content,                        className: 'input',                      })                    );                  }                  return React.DOM.td({                    key: cellindex,                    'data-row': rowindex,                    className: 'data',                  }, content);                }, this)              )            )          }, this)          )      )    );  }});ReactDOM.render(  React.createElement(Excel, {      headers: headers,      initialData: data,      tableClass: 'table',    }),  document.getElementById('app'));