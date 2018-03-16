$(document).ready(function() {
	var cart = $.localStorage.get('cart') || {"items":[], "count":0}; // здесь храним данные по корзине

	/* Функция запрашивает список товаров с сервера и помещает его на страницу */
	function getProductList() {
		$.getJSON("ajax/productList.php", // запрос на сервер, результат должен быть json строкой
			function(data) {
				var productList = data.results; // в ответе мы дожны иметь объект, в котором лежит список товаров в виде массива в свойстве results
				$("#tmpl-product-item") // отправляем данные в шаблонизатор
					.tmpl(productList)
					.appendTo(".js-product-list")
					.find(".js-buy").click( function(e) {
						e.preventDefault();
						addToCart($(this).tmplItem().data);
					});
			}
		);
	}

	/* Функция добавляет товар в корзину */
	function addToCart(item) {
		var cartItem = cart.items[item.id];
		if (cartItem) {                // если товар уже лежит в корзине, увеличиваем количество
			cartItem.quantity++;
		} else {                       // если еще нет, то собираем все данные
			cartItem = item;
			cartItem.quantity = 1;
		}
		cart.items[item.id] = cartItem;      // обновили/добавили элемент
		cart.count++;
		onCartChange();
	}

	/* Функция вычитает товар из корзины */
	function subFromCart(item) {
		var cartItem = cart.items[item.id];
		if (cartItem) {                // если товар лежит в корзине, уменьшаем количество
			cartItem.quantity--;
		} else {                       // иначе делать нечего
			return;
		}
		if (cartItem.quantity>0) {
			cart.items[item.id] = cartItem;  // обновили элемент корзины
		} else {
			delete cart.items[item.id];      // если количество товара не больше ноля, убираем товар из корзины
		}
		cart.count--;
		onCartChange();
	}

	/* Функция обработки корзины после изменения */
	function onCartChange() {
		saveCart();
		renderCart();
	}

	/* Функция сохранения корзины */
	function saveCart() {
		var data = {c:[]};
		$.each(cart.items, function(i,item) {    // пересоберем корзину для минимизации трафика
			if (typeof item !== "undefined" && item !== null) {
				data.c.push({"i":item.id,"q":item.quantity});
			}
		});
		$.getJSON("ajax/cart.php", data); // отправляем данные на сервер
		
		$.localStorage.set('cart', cart);  // сохраняем данные в локальном хранилище браузера
	}

	/* Функция отрисовки корзины на странице */
	function renderCart() {
		$(".js-cart-list").empty();                    // очищаем блок со списком товаров в корзине
		var cartTmpl = $("#tmpl-cart-item")            // отправляем в шаблонизатор
			.tmpl(cart.items)
			.appendTo(".js-cart-list");
		cartTmpl.find(".js-add").click( function(e) {  // нажатие на плюс
			e.preventDefault();
			addToCart($(this).tmplItem().data);
		});
		cartTmpl.find(".js-sub").click( function(e) {  // нажатие на минус
			e.preventDefault();
			subFromCart($(this).tmplItem().data);
		});
		$(".js-cart-count").text(cart.count);
	}

	$(".js-cart-ico").click( function() {  // показ корзины
		$(".js-cart-list").toggle();
	});
	
	getProductList();
	renderCart();
});