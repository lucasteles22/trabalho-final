(function () {
    app.filter("searchByDate", function () {
        return function (items, start, end) {
            var arrayToReturn = [];
            for (var i = 0; i < items.length; i++) {
                var s = new Date(items[i].StartDate);
                var st = new Date(start);
                var e = new Date(end);
                s.setDate(s.getDate() + 1);
                if (s >= st && s <= e)
                    arrayToReturn.push(items[i]);
            }
            return arrayToReturn
        };
    });

})();
