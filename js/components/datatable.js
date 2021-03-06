'use strict';

app.component('datatable', {
	bindings: {
    	data: '<'
  	},
  	controllerAs: '$datatableCtrl',
	controller: function($rootScope, $element, DEFAULTS){

		var svg;
		var width;
		var height;
		var rowHeight = 25;
		var textPadding = 10;
		var el = $element[0];
		var textAnchorStart = [0];
		var $datatableCtrl = this;
		var bg = d3.color(DEFAULTS.COLORS.BG).darker(1);
		var tt = DEFAULTS.TRANSITION.TIME;

		$datatableCtrl.init = function(){

			angular.element(el).empty();

			var margin = {top: 10, right: 10, bottom: 0, left: 10};

			width = el.clientWidth - margin.left - margin.right;
			height = el.clientHeight - margin.top - margin.bottom;

    		svg = d3.select(el).append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
					.attr('class', 'datatable');

		};

		$datatableCtrl.$onChanges = function(changes){
			$datatableCtrl.update(el, changes.data.currentValue);
		};

		$datatableCtrl.update = function(el, data){
			var _header = makeHeader(data);
			var _rowLength = Object.keys(_header).length;

			makeFooter(data, _header);

			var rows = svg.selectAll('g.rows').data(data, function(d){ return d.name; });

  			var enterRows = rows
  				.enter()
  				.append('g')
  				.style('opacity', 0)
  				.attr('class', 'rows')
  				.classed('th', function(d, i){ return i === 0 || i === data.length-1; })
  				.attr('transform', function(d, i){ return 'translate(0,' + (i*rowHeight) + ')'; })
			.merge(rows)
				.transition().duration(tt)
				.attr('transform', function(d, i){ return 'translate(0,' + (i*rowHeight) + ')'; })
  				.style('opacity', 1);

			rows
				.exit()
				.transition().duration(tt)
				.attr('transform', 'scale(1,0)')
				.style('opacity', 0)
				.remove();

			var bgs = rows.merge(enterRows).selectAll('rect.bgs').data(extractData);

			bgs
				.enter()
				.append('rect')
				.attr('fill', bg)
				.attr('class', 'bgs')
				.attr('x', function(d, i){ return i*(width/_rowLength); })
				.attr('y', 0)
				.attr('height', rowHeight-2)
				.attr('width', (width/_rowLength)-2)
			.merge(bgs)
				.transition().duration(tt)
				.attr('x', function(d, i){ return i*(width/_rowLength); });

			bgs
				.exit()
				.transition().duration(tt)
				.style('opacity', 0)
				.remove();

			var cells = rows.merge(enterRows).selectAll('text.cells').data(extractData);

			cells
				.enter()
				.append('text')
				.attr('class', 'cells')
				.style('text-anchor', function(d, i){
					if(textAnchorStart.indexOf(i) !== -1){
						return 'start';
					}
					return 'end';
				})
				.style('fill', d3.color('white'))
				.attr('y', (rowHeight/2))
				.attr('x', function(d, i){
					if(textAnchorStart.indexOf(i) !== -1){
						return i*(width/_rowLength)+textPadding;
					}
					return i*(width/_rowLength)+(width/_rowLength)-textPadding;
				})
			.merge(cells)
				.transition().duration(tt)
				.attr('dy', '.4em')
				.tween('text', function(d){
            		var that = d3.select(this);
					if(angular.isNumber(d)){
            			var i = d3.interpolateNumber(that.text(), d);
						return function(t) {
							that.text(i(t).toFixed(2));
						};
					}
				})
				.on('start', function(d){
					if(!angular.isNumber(d)){
						d3.select(this).text(d);
					}
				});

			cells
				.exit()
				.transition().duration(tt)
				.remove();
		};

		function extractData(d){
			var _d = [];
			angular.forEach(d, function(k){
				_d.push(k);
			});
			return _d;
		}

		function makeHeader(d){
			var _h = {};
			var _k = d3.keys(d[0]);
			_k.forEach(function(k){ _h[k] = k; });
			d.unshift(_h);
			return _h;
		}

		function makeFooter(data, _h){
			var _f = {name: 'Total'};
			angular.forEach(_h, function(d){
				if(Object.keys(_f).indexOf(d) === -1){
					_f[d] = d3.sum(data, function(k){
						if(angular.isNumber(k[d])){
							return k[d];
						}else{
							return 'hello';
						}
					});
				}
			});
			data.push(_f);
		}

		$datatableCtrl.init();

		$rootScope.$on('window:resize', function(){
			$datatableCtrl.init();
		});
	}
});
