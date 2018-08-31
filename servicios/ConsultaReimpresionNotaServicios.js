app.factory('consultaReimpresionNotaServicios', ['$http', 'WebService', 
	function($http, WebService) {
		var urlBase = WebService.WS_SIST_INF;
		var urlImpresion= WebService.WS_Impresion;
		var urlDetalleTicket= WebService.WS_Detalle;
		var urlDetalleTickets=	WebService.WS_DetalleImpresion;

		var urlSisInfo=	WebService.WS_SIST_INFEPOS;
					
		var dataFactory = {};

		dataFactory.obtenerPresupuestos = function (parametros) {
			return $http.post(urlBase + '/obtenerPresupuestos',{ infoPresupuesto : parametros } );
		};

		dataFactory.obtenerDetallePresupuesto = function (parametros) {
			return $http.post(urlBase + '/obtenerDetallePresupuesto', parametros );
		};

		dataFactory.obtenerDetalleVenta = function (parametros) {
			return $http.post(urlBase + '/obtenerDetalleVenta', parametros );
		};

		dataFactory.obtenerDetalleEstado = function (parametros) {
			return $http.post(urlBase + '/obtenerDetalleEstado', parametros );
		};

		dataFactory.obtenerDetalleCliente = function (parametros) {
			return $http.post(urlBase + '/obtenerDetalleCliente', parametros );
		};
		dataFactory.obtenerNoImpreison = function (parametros) {
			return $http.post(urlImpresion + '/GenerarTickets', parametros );
		};
		dataFactory.obtenerImpreison = function (parametros) { 
			return $http.post(urlImpresion + '/ImprimirTickets?idticket='+parametros, parametros );
		}; 
		dataFactory.obtenerDetalle = function (parametros) {

			return $http.post(urlDetalleTicket+'/ObtenerDetallePedidoReimpresion' , parametros );
		}; 
		dataFactory.obtenerDetalleTicket = function (parametros) {

			return $http.get(urlDetalleTickets+'/cadenasImpresionNuevo?esMoto=false&estacion='+parametros.estacion+'&pedido='+parametros.pedido+'&seguro='+parametros.seguro+'&usuario='+parametros.usuario+'&vae='+parametros.vae+'&tipoVenta='+parametros.tipoVenta );
		}; 

		dataFactory.obtenerDetalleBusqueda = function (parametros) {

			//return $http.get('http://10.51.119.112:8071/WSSistemasInfProducto.svc/json/BusquedaProductos?tipoBusqueda='+parametros.tipoBusqueda+'&descrip='+parametros.descrip );
			return $http.get(urlSisInfo+'/BusquedaProductos?tipoBusqueda='+parametros.tipoBusqueda+'&descrip='+parametros.descrip );
		}; 
		dataFactory.obtenerDetalleProductos = function (parametros) {
			//http://localhost:14245/WSSistemasInfProducto.svc
			//return $http.get('http://10.51.119.112:8071/WSSistemasInfProducto.svc/json/DetalleProductos?sku='+parametros.sku+'&empleado='+parametros.empleado );
			return $http.get(urlSisInfo+'/DetalleProductos?sku='+parametros.sku+'&empleado='+parametros.empleado );
		}; 
		

		return dataFactory;
	}]);
