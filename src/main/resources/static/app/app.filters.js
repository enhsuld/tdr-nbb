altairApp
    .filter('multiSelectFilter', function () {
        return function (items, filterData) {
            if (filterData == undefined)
                return items;
            var keys = Object.keys(filterData);
            var filtered = [];
            var populate = true;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                populate = true;
                for (var j = 0; j < keys.length; j++) {
                    if (filterData[keys[j]] != undefined) {
                        if (filterData[keys[j]].length == 0 || filterData[keys[j]].contains(item[keys[j]])) {
                            populate = true;
                        } else {
                            populate = false;
                            break;
                        }
                    }
                }
                if (populate) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    })
    .filter("jsonDate", function () {
        return function (x) {
            if (x) return new Date(x);
            else return null;
        };
    })
    .filter("momentDate", function () {
        return function (x, date_format_i, date_format_o) {
            if (x) {
                if (date_format_i) {
                    return moment(x, date_format_i).format(date_format_o)
                } else {
                    return moment(new Date(x)).format(date_format_o)
                }
            }
            else return null;
        };
    })
    .filter("initials", function () {
        return function (x) {
            if (x) {
                return x.split(' ').map(function (s) {
                    return s.charAt(0);
                }).join('');
            } else {
                return null;
            }
        };
    })
    .filter('reverseOrder', function () {
        return function (items) {
            return items.slice().reverse();
        };
    })
    .filter("trust", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }])
    .filter('words', function () {
        function isInteger(x) {
            return x % 1 === 0;
        }


        return function (value) {
            if (value){
                if (isInteger(value)){
                    return toWords(value, true) + " төгрөг";
                }
                else{
                    var buhel = parseInt(value), butarhai = Math.round(value%1*100);
                    return toWords(buhel, true) + " төгрөг " + ((butarhai > 0) ? (toWords(butarhai, true) + " мөнгө") : "");
                }
            }
            return value;
        }
    });
;

/*function toWordsMN(n) {
    var words = [{ Name0 : "", Name10 : "", NameMiddle : "",Name10End:"" },
        { Name0 : "нэг", Name10 : "арван", NameMiddle : "нэгэн", Name10End : "арав", Name3 : "нэг" },
        { Name0 : "хоёр", Name10 : "хорин", NameMiddle : "хоёр", Name10End : "хорь", Name3 : "хоёр" },
        { Name0 : "гурав", Name10 : "гучин", NameMiddle : "гурван", Name10End : "гуч", Name3 : "гурван" },
        { Name0 : "дөрөв", Name10 : "дөчин", NameMiddle : "дөрвөн", Name10End : "дөч", Name3 : "дөрвөн" },
        { Name0 : "тав", Name10 : "тавин", NameMiddle : "таван", Name10End : "тавь", Name3 : "таван" },
        { Name0 : "зургаа", Name10 : "жаран", NameMiddle : "зургаан", Name10End : "жар", Name3 : "зургаан" },
        { Name0 : "долоо", Name10 : "далан", NameMiddle : "долоон", Name10End : "дал", Name3 : "долоон" },
        { Name0 : "найм", Name10 : "наян", NameMiddle : "найман", Name10End : "ная", Name3 : "найман" },
        { Name0 : "ес", Name10 : "ерэн", NameMiddle : "есөн", Name10End : "ер", Name3 : "есөн" }],
        buhel = parseInt(n), butarhai = parseInt(n%1*100);
        console.log(buhel);
        console.log(butarhai);
}*/

function toWords(n, b) {
    var a = '.нэг.хоёр.гурав.дөрөв.тав.зургаа.долоо.найм.ес.арав.хорь.гуч.дөч.тавь.жар.дал.ная.ер.нэгэн.хоёр.гурван.дөрвөн.таван.зургаан.долоон.найман.есөн.арван.хорин.гучин.дөчин.тавин.жаран.далан.наян.ерэн.зуу.зуун.мянга.сая.тэрбум.их наяд.тэг'.split('.'),
        k = -1, r = [], p = b ? 18 : 0, fn = function (r, i, j, b) {
            var w = [], h, t, n;
            if (i) {
                h = Math.floor(i / 100);
                t = Math.floor(i % 100 / 10);
                n = i % 10;
                if (h) {
                    //console.log(a[h + 18]);
                    //w.push(a[h == 1 ? parseInt(b) : h + 18]);
                    w.push(a[h == 1 ? 1 : h + 18]);
                    w.push(a[!t && !n && !j && !p ? 37 : 38])
                }
                if (t){
                    w.push(a[t + (!n && !j ? p + 9 : 27)]);
                    //console.log(a[t + (!n && !j ? p + 9 : 27)]);
                }
                if (n && ((!b && r && (n >= 1 || (n == 1 && (h || t)))) || b || !r)){

                    /*console.log(a[(j ? 0 : p) + 1]);
                    console.log(a[j ? n + 18 : p + n]);
                    console.log(w);*/
                    //console.log(a[p + n]);
                    //w.push(a[n == 1 && !h && !t ? (j ? 0 : p) + 1 : (j ? n + 18 : p + n)]);
                    //alert(j);
                    w.push(a[n == 1 && !h && !t ? (j ? 0 : p) + 1 : (j ? n + 18 : p + n)]);
                }
                if (j){
                    //console.log(a[j + 38] + (!r && p && j == 1 ? 'н' : ''));
                    w.push(a[j + 38] + (!r && p && j == 1 ? 'н' : ''));
                }
            }
            return w.concat(r)
        };
    if (!n) return a.pop();
    do {
        r = fn(r, n % 1000, ++k, n >= 1000);
    } while (n = Math.floor(n / 1000));
    return r.join(' ')
}

window.toWords = toWords;