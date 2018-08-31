




app.controller('consultaDetallePedidoControlador', ['$scope', '$stateParams', 'ngDialog', 'consultaReimpresionNotaServicios', 'mensajeServicio', '$filter', 
    function($scope, $stateParams, ngDialog, consultaReimpresionNotaServicios, mensajeServicio, $filter)
    {
		$scope.empleado = $stateParams.numempleado;

		$scope.estacion = $stateParams.estacion;

		//alert($stateParams.estacion);
		
		var date = new Date();
		var dateArray = date.toISOString().slice(0,10).replace(/-/g,"/").split("/");
		var dateFormat = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
		
		$scope.startDate = dateFormat;
		$scope.endDate = dateFormat;
		$scope.sinResultados = true;
		
		$scope.tipoPais=[];
		$scope.tipoBusqueda=[];

		$scope.Respuesta=[];
		$scope.RespuestaTiket=[];
		$scope.detalleTicket=[];
		$scope.detalleTicketImpresion=[];
		$scope.RespuestaImpresion=[];

		$scope.selectEmpreas=[];
		$scope.selectPais=[];
		$scope.busquedaReporte=false;

		$scope.total="$12,900";
		$scope.pedido='';
		$scope.esMoto=false;
		$scope.esSeguros=false;
		$scope.esVae=false;
		$scope.Vae=0;
		$scope.tipoVentas=0;
		$scope.idTicketImpresion=0;

		$scope.imprimeNota=true;
		$scope.imprimeCalendario=false;

		$scope.imprimeNotaD='';
		$scope.imprimeCalendarioD='';

		$scope.Busqueda = [];
		$scope.showDetalle= false;
		$scope.totalInventario= 0;

		var sortingOrder = 'Sku';

		$scope.tipoVenta = [
			{
				nombre: "Ver presupuesto de crédito",
				tipo: 2,
				seleccionado: true
			},
			{
				nombre: "Ver presupuesto de contado",
				tipo: 1,
				seleccionado: true
			},
			{
				nombre: "Ver presupuesto de apartado",
				tipo: 3,
				seleccionado: true
			},
			{
				nombre: "Ver presupuesto de mostrador",
				tipo: 4,
				seleccionado: true
			}
		];	

	$scope.tipoBusqueda = [
			{
				nombre: "Codigo",
				tipo: 1,
				//seleccionado: true
			},
			{
				nombre: "Descripción",
				tipo: 2,
				//seleccionado: true
			},
			{
				nombre: "Marca",
				tipo: 3,
				//seleccionado: true
			}			
		];	 

	

		$scope.tipoPais = [
			{
				nombre: "México",	
				tipo: 1,
				seleccionado: false
			}
			
		];	

		$scope.initConsultaPresupuestos = function(){
			$scope.esPrimerConsulta = true;
			$scope.selectEmpreas={
				nombre: "Nombre de Cliente",
				tipo: 3,
				seleccionado: false
			};


			//alert($scope.selectEmpreas.nombre);


			//$scope.consultarPresupuestos();

//			$scope.consultarPresupuestos2();
		}



$scope.currency=function (value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
}
		
		$scope.cargarEmpresa = function(){
			
			//alert($scope.selectEmpreas.nombre);
			

			//if ($scope.pedido.length==0){
				//mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: 'Favor de Capturar un número de pedido' , clase: 'rojo'});
			/*}else{
				$scope.busquedaReporte=true;
			}*/
			$scope.busquedaReporte=true;

			//	$scope.$apply();
		}

		

		$scope.regresar = function(){
			
			//alert('Entro');
			$("#nota").attr('checked', true);
			$("#cale").attr('checked', false);
			$scope.busquedaReporte=false;
			$scope.pedido='';

		}

		$scope.reimprimir = function(){

					console.log('Entro en la funcion reimprimir');

					alert('Entro en la funcion reimprimir');
		}

		$scope.mensajeImpreison = function(mensaje)
	    {	

	    	var self = this;
			var dialog = ngDialog.open({
	                    template: 'Templates/MensajeServicioImpresion.html',
	                    className: 'ngdialog-theme-plain',
	                    showClose: false,
	                    closeByDocument: false,
	                    closeByEscape: false,
	                    cache: false,
						controller: ['$scope', function($scope) {
										$scope.titulo = mensaje.titulo;
										$scope.msj = mensaje.msjUsuario;
										$scope.msjTecnico = mensaje.msjTecnico;
										$scope.mostrarMsjTec = false;
										$scope.clase = mensaje.clase;
										$scope.reimprimir = function(){
										//	alert('hola mundo ');

											self.GeneraTicketImpresion();

										};
										$scope.limpiar = function(){
										//	alert('hola mundo ');

											self.limpiar();

										};
									}]
	                });
					
			return dialog;
	    };

		function ValidarCaracteres(){



		}

		$scope.limpiar=function(){
			$scope.RespuestaTiket=[];
			$scope.detalleTicket=[];
			$scope.detalleTicketImpresion=[];
			$scope.RespuestaImpresion=[];
			$("#nota").prop('checked', true);
			$("#cale").prop('checked', false);
			$scope.imprimeCalendario=false;
			$scope.imprimeNota=true;
			$scope.regresar();
		}


		


		$scope.consultarPresupuestos2 = function(){
			
			
			$scope.showDetalle= false;

			///alert($scope.Busqueda)
			
			//$scope.pedido = 0;
			/*$scope.empleado = 'T226613';
			$scope.estacion = 'EKT015';*/
			$scope.listaPresupuestos = [];
			if ($scope.pedido.length>0){
				//alert($scope.pedido.length);
				
				if ($scope.Busqueda.tipo != 1) {

						$scope.idDial = mensajeServicio.indicadorEspera('Consultando busqueda', 'verde');


						consultaReimpresionNotaServicios.obtenerDetalleBusqueda({tipoBusqueda: parseInt($scope.Busqueda.tipo), descrip: $scope.pedido}).then(
					function(respuesta){

						$scope.Respuesta=respuesta.data;
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						$scope.valida= respuesta.data.error;
						try{

							if (respuesta.data.error===true)
								{
									$scope.BusquedaPedido= false;
									$scope.busquedaReporte = true;
									$scope.mensaje = respuesta.data.mensaje
									mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: $scope.mensaje, msjTecnico : $scope.mensaje, clase: 'rojo'});	

										
								}
								else
								{
									//mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
									//$scope.tipoVentas=$scope.Respuesta.ObtenerDetallePedidoReimpresionResult.TipoVenta;
									//$scope.esVae=$scope.Respuesta.ObtenerDetallePedidoReimpresionResult.EsPedidoVAE;
									if ($scope.Respuesta.detBusquesa.length>0){
											 $scope.search();
											$scope.sinResultados = false;
											$scope.cargarEmpresa();
											$scope.pedido='';
									}else{
										$scope.sinResultados = true;
										$scope.search();
										$scope.mensaje = 'No se encontraron registros con la información proporcionada';
										
											mensajeServicio.mensajeError({titulo: 'Mensaje', msjUsuario: $scope.mensaje, clase: 'rojo'});
										
									}
									
									
								}
								
						}catch(e){
							console.log(e);
						}	
						

						
						//alert(respuesta.data);
						
					},
					function(error){
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						$scope.mensaje = 'Ocurrio un error al obtener la consulta de presupuestos';
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "Error al obtener la consulta de pedido" , clase: 'rojo'});
					}
				);
				} //Consulta por el tipo 3
				else{
					 if (!/^([0-9])*$/.test($scope.pedido)){
					 					$scope.mensaje = 'Para la opcion de codigo, solo se permiten caracateres númericos';
										mensajeServicio.mensajeError({titulo: 'Mensaje', msjUsuario: $scope.mensaje, clase: 'rojo'});
					}else{
						$scope.consultarDetalleProducto($scope.pedido);
					}

						
				}

				
			}else{
				mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
				mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: 'Favor de Capturar un número de pedido' , clase: 'rojo'});
			}
		};

		 

			$scope.consultarDetalleProducto = function(sku){
			
			$scope.idDial = mensajeServicio.indicadorEspera('Consultando Detalle del Producto', 'verde');
			

			///alert($scope.Busqueda)
			
			//$scope.pedido = 0;
			/*$scope.empleado = 'T226613';
			$scope.estacion = 'EKT015';*/
			$scope.listaPresupuestos = [];
			
				//alert($scope.pedido.length);
				consultaReimpresionNotaServicios.obtenerDetalleProductos({sku: parseInt(sku), empleado: $scope.empleado}).then(
					function(respuesta){

						$scope.Respuesta=respuesta.data;
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						$scope.valida= respuesta.data.error;
						try{

							if (respuesta.data.error===true)
								{
									
									//$scope.showDetalle= true;
									$scope.mensaje = respuesta.data.mensaje
									mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: $scope.mensaje, msjTecnico : $scope.mensaje, clase: 'rojo'});	

										
								}
								else
								{
									$scope.totalInventario=0;
									$.map($scope.Respuesta.detExistInv,function(index,data){
											$scope.totalInventario += index.existencia;
									});

									if ($scope.Respuesta.codigo != null){
											$scope.showDetalle= true;
											$scope.BusquedaPedido= false;
											$scope.busquedaReporte=false;
											$scope.tabInicial();
									}else{
										$scope.mensaje = respuesta.data.mensaje
										mensajeServicio.mensajeError({titulo: 'Alerta', msjUsuario: 'No se encontro descripción para el sku: '+sku , clase: 'rojo'});
									}
									
									//mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
									//$scope.tipoVentas=$scope.Respuesta.ObtenerDetallePedidoReimpresionResult.TipoVenta;
									//$scope.esVae=$scope.Respuesta.ObtenerDetallePedidoReimpresionResult.EsPedidoVAE;
									/*if ($scope.Respuesta.detBusquesa.length>0){
											
											$scope.sinResultados = false;
											$scope.cargarEmpresa();
											$scope.pedido='';
									}else{
										$scope.sinResultados = true;
										$scope.mensaje = 'No se encontraron registros con la información proporcionada';
										if(!$scope.esPrimerConsulta){ //Primera consulta no se muestra mensaje de dialogo
											mensajeServicio.mensajeError({titulo: 'Mensaje', msjUsuario: $scope.mensaje, clase: 'verde'});
										}
									}*/
									
									
								}
								
						}catch(e){
							console.log(e);
						}	
						

						
						//alert(respuesta.data);
						
					},
					function(error){
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						$scope.mensaje = 'Ocurrio un error al obtener la consulta de presupuestos';
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "Error al obtener la consulta de pedido" , clase: 'rojo'});
					}
				);
			
		};

		$scope.consultardatosTicket = function(){
			
			$scope.idDial = mensajeServicio.indicadorEspera('Imprimiendo tickets para el pedido '+$scope.pedido, 'verde');


			$.each($scope.Respuesta.ObtenerDetallePedidoReimpresionResult.DetallesProducto, function(key,val) {
            		if (!$scope.esMoto){

            			if (val.EsMoto){
							$scope.esMoto=true;            				
            			}
            		}
       		});

/*
	$scope.imprimeNotaD='';
		$scope.imprimeCalendarioD='';
		$scope.imprimeNota=false;
		$scope.imprimeCalendario=false;


*/

       		
       				$scope.imprimeNotaD=$("#nota").is(':checked')? "Nota de entrega":'';
       		

       		
       				$scope.imprimeCalendarioD=$("#cale").is(':checked')? "Calendario de pagos":'';
       		
       		
       		
			
			console.log('$scope.imprimeNotaD'+$scope.imprimeNotaD+' $scope.imprimeCalendarioD'+$scope.imprimeCalendarioD);
			
			//$scope.pedido = 0;
			
			$scope.listaPresupuestos = [];
			if ($scope.pedido.length>0){
				//alert($scope.pedido.length);	esMoto=false&estacion=NT0078&pedido=1428125&seguro=false&usuario=T312335&vae=0&tipoVenta=2

				if ($scope.imprimeNotaD!='' || $scope.imprimeCalendarioD!=''){
																	//esMoto=false&estacion=NT0078&pedido=691727&seguro=false&usuario=T226613&vae=0&tipoVenta=1
					consultaReimpresionNotaServicios.obtenerDetalleTicket({esMoto: $scope.esMoto, estacion: $scope.estacion, pedido: parseInt($scope.pedido),seguro:$scope.esSeguros,usuario:$scope.empleado,vae:$scope.Vae,tipoVenta:$scope.tipoVentas}).then(
						function(respuesta){

							$scope.RespuestaTiket=respuesta.data;
							mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
							//$scope.valida= respuesta.data.ObtenerDetallePedidoReimpresionResult.Resultado.Respuesta;
							try{
									if ($scope.RespuestaTiket.error==true)
									{
										$scope.mensaje = $scope.RespuestaTiket.mensaje;
										mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: $scope.mensaje, clase: 'rojo'});	

										
											
									}else{
										//$scope.RespuestaTiket=$scope.Respuesta.datTicket;
										//mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
									if($scope.RespuestaTiket.datTicket.length>0){
												if ($scope.tipoVentas==2){
											
															$.each($scope.RespuestaTiket.datTicket, function(key,val) {
									            		

									            					if (val.Aplicacion==$scope.imprimeNotaD || val.Aplicacion==$scope.imprimeCalendarioD ){
																				$scope.detalleTicketImpresion.push(val);           				
									            					}
									            		
									       					});
												}else{
														$.each($scope.RespuestaTiket.datTicket, function(key,val) {
								            		

								            					if (val.Aplicacion=="Nota de entrega"){
																	$scope.detalleTicketImpresion.push(val);           				
								            					}
								            		
								       					});

												}
												//alert($scope.detalleTicketImpresion);
												/*Genera el Tiket de Impresion para la nota de entrega*/
												$scope.GeneraNoTicket();
									}else{
													mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
													$scope.mensaje = 'Ocurrio un error al obtener la consulta de presupuestos';
													mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "No hay ticket para imprimir " , clase: 'rojo'});
									}
										

										/*if ($scope.RespuestaTiket.length>0){
												
												$scope.sinResultados = false;
												alert($scope.RespuestaTiket);
										}else{
											$scope.sinResultados = true;
											$scope.mensaje = 'No se encontraron registros con la información proporcionada';
											if(!$scope.esPrimerConsulta){ //Primera consulta no se muestra mensaje de dialogo
												mensajeServicio.mensajeError({titulo: 'Mensaje', msjUsuario: $scope.mensaje, clase: 'verde'});
											}
										}*/

										
										
										
									}
							}catch(e){
								console.log(e);
							}	
							

							
							//alert(respuesta.data);
							
						},
						function(error){
							mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
							$scope.mensaje = 'Ocurrio un error al obtener la consulta de presupuestos';
							mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "Error al obtener la consulta de presupuestos" , clase: 'rojo'});
						}
					);
				}else{
					mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
					mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: 'Favor de seleccionar un ticket para imprimir' , clase: 'rojo'});	
				}


			}else{
				mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
				mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: 'Favor de Capturar un número de pedido' , clase: 'rojo'});
			}
		};


		$scope.GeneraNoTicket = function(){
			
				$scope.idDial = mensajeServicio.indicadorEspera('Imprimiendo tickets para el pedido '+$scope.pedido, 'verde');
		

				/*
					public Contenido:string,
					public Detalle:string,
					public EstatusExito:boolean
				*/

			$scope.listaPresupuestos = [];

			$scope.cadena=	
				{
				    "ListaTickets": $scope.detalleTicketImpresion
				};
		
				//alert($scope.pedido.length);
				consultaReimpresionNotaServicios.obtenerNoImpreison($scope.cadena).then(
					function(respuesta){

						$scope.RespuestaImpresion=respuesta.data;
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						
						try{

							if (!$scope.RespuestaImpresion.EstatusExito)
								{
									$scope.mensaje = 'Error al generar numero de impresión ';
									mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: $scope.mensaje,msjTecnico :$scope.RespuestaImpresion.Detalle, clase: 'rojo'});	

										
								}else{
									//mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
									$scope.idTicketImpresion=$scope.RespuestaImpresion.Contenido;
									$scope.GeneraTicketImpresion($scope.idTicketImpresion);
									
								}
								
						}catch(e){
							console.log(e);
						}	
						

						
						//alert(respuesta.data);
						
					},
					function(error){
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						$scope.mensaje = 'Ocurrio un error al generar ticket de nota de entrega';
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: $scope.mensaje , clase: 'rojo'});
					}
				);
			
		};

		$scope.GeneraTicketImpresion = function(){
			
				$scope.idDial = mensajeServicio.indicadorEspera('Imprimiendo tickets para el pedido '+$scope.pedido, 'verde');
		

				/*
					public Contenido:string,
					public Detalle:string,
					public EstatusExito:boolean
				*/
				console.log('Numero de ticket');
				console.log($scope.idTicketImpresion);

			$scope.listaPresupuestos = [];
		
				//alert($scope.pedido.length);
				consultaReimpresionNotaServicios.obtenerImpreison($scope.idTicketImpresion).then(
					function(respuesta){

						$scope.RespuestaImpresion=respuesta.data;
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						
						try{

							if (!$scope.RespuestaImpresion.EstatusExito)
								{
									$scope.mensaje = 'Error al generar numero de impresión ';
									mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: $scope.mensaje,msjTecnico :$scope.RespuestaImpresion.Detalle, clase: 'rojo'});	

										
								}else{
									//mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
									$scope.mensaje = '¿Se imprimio correctamente el ticket del pedido '+$scope.pedido +'?';
									$scope.mensajeImpreison({titulo: 'Alerta', msjUsuario: $scope.mensaje,msjTecnico :$scope.RespuestaImpresion.Detalle, clase: 'verde'});	
									
								}
								
						}catch(e){
							console.log(e);
						}	
						

						
						//alert(respuesta.data);
						
					},
					function(error){
						mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
						$scope.mensaje = 'Ocurrio un error al generar ticket de nota de entrega';
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: $scope.mensaje , clase: 'rojo'});
					}
				);
			
		};

		

		function obtenerTiposVenta(){
			var tipoVenta = "";
			for (var i = 0; i < $scope.tipoVenta.length; i++) {
			   var item = $scope.tipoVenta[i];
			   if (item.seleccionado)
					tipoVenta += item.tipo + ",";
			}
			tipoVenta = tipoVenta.slice(0, -1);
			return tipoVenta;
		}
		
		function validaFiltros(){
			var objFiltros = { error : true, mensaje : '' };
			if($scope.startDate == '' || $scope.endDate == '')
				objFiltros.mensaje = 'Debe ingresar una fecha de inicio y una fecha final, verifique por favor.';
			else if(obtenerTiposVenta() == '')
				objFiltros.mensaje = 'Seleccione al menos un tipo de presupuesto a mostrar, verifique por favor.';
			else
				objFiltros.error = false;
			return objFiltros;
		};
		
		$scope.consultarPresupuestos = function(){
			var validarFiltros = validaFiltros();
			if(validarFiltros.error){
				mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: validarFiltros.mensaje, clase: 'rojo'});
				return;
			}
			
			$scope.idDial = mensajeServicio.indicadorEspera('Consultando presupuestos', 'verde');
			
			var fechaInicio = $scope.startDate.split("/")[2] + $scope.startDate.split("/")[1] + $scope.startDate.split("/")[0];
			var fechaFin = $scope.endDate.split("/")[2] + $scope.endDate.split("/")[1] + $scope.endDate.split("/")[0] + " 23:59:59";
			var empleado = $stateParams.numempleado;
			var tipoVenta = obtenerTiposVenta();
			
			$scope.nPresupuestos = 0;
			$scope.nVentas = 0;
			$scope.pProductividad = 0;
			$scope.listaPresupuestos = [];
			
			consultaReimpresionNotaServicios.obtenerPresupuestos({Empleado: empleado, FechaInicio: fechaInicio, FechaFin: fechaFin, TipoVenta : tipoVenta}).then(
				function(respuesta){
					mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
					if(!respuesta.data.obtenerPresupuestosResult.EsError)
					{
						if(respuesta.data.obtenerPresupuestosResult.ListaPresupuestos.length > 0)
						{
							$scope.sinResultados = false;
							$scope.listaPresupuestos = respuesta.data.obtenerPresupuestosResult.ListaPresupuestos;
							$scope.nPresupuestos = respuesta.data.obtenerPresupuestosResult.TotalPresupuesto;
							$scope.nVentas = respuesta.data.obtenerPresupuestosResult.TotalVentasMarcadas;
							$scope.pProductividad = respuesta.data.obtenerPresupuestosResult.Productividad;
						}else{
							$scope.sinResultados = true;
							$scope.mensaje = 'No se encontraron registros con la información proporcionada';
							if(!$scope.esPrimerConsulta){ //Primera consulta no se muestra mensaje de dialogo
								mensajeServicio.mensajeError({titulo: 'Mensaje', msjUsuario: $scope.mensaje, clase: 'verde'});
							}
						}
						$scope.esPrimerConsulta = false;
					}else{
						$scope.mensaje = 'Ocurrio un error al obtener la consulta de presupuestos';
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: respuesta.data.obtenerPresupuestosResult.MensajeError , msjTecnico : respuesta.data.obtenerPresupuestosResult.MensajeError, clase: 'rojo'});
					}
				},
				function(error){
					mensajeServicio.cerrarIndicadorEsperaId($scope.idDial);
					$scope.mensaje = 'Ocurrio un error al obtener la consulta de presupuestos';
					mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "Error al obtener la consulta de presupuestos", msjTecnico : error.status + " - " + error.statusText, clase: 'rojo'});
				}
			);
		};
		
		$scope.MostrarDetallePresupuesto = function (presupuesto){
			var idIndicador = mensajeServicio.indicadorEspera('Obteniendo detalle de presupuesto', 'verde');
			$scope.mensajeSinProductos = 'No se encontraron productos del presupuesto';
			$scope.presupuesto = presupuesto;
			consultaReimpresionNotaServicios.obtenerDetallePresupuesto({presupuesto : presupuesto}).then(
				function(respuesta){
					mensajeServicio.cerrarIndicadorEsperaId(idIndicador);
					if(!respuesta.data.obtenerDetallePresupuestoResult.EsError){
						$scope.listaProductos = respuesta.data.obtenerDetallePresupuestoResult.ListaDetallePresupuestos;
						ngDialog.open({
							template: 'templates/DetallePresupuesto.html',
							className: 'ngdialog-theme-plain',
							showClose: true,
							closeByDocument: false,
							closeByEscape: true,
							cache: false,
							scope: $scope,
						});
					}else{
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: respuesta.data.obtenerDetallePresupuestoResult.MensajeError , msjTecnico : respuesta.data.obtenerDetallePresupuestoResult.MensajeError, clase: 'rojo'});
					}
				},
				function(error){
					mensajeServicio.cerrarIndicadorEsperaId(idIndicador);
					mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "Error al obtener detalle de presupuesto", msjTecnico : error.status + " - " + error.statusText, clase: 'rojo'});
				}
			);
		}
		
		$scope.MostrarDetalleEstado = function (pedido){
			var idIndicador = mensajeServicio.indicadorEspera('Obteniendo movimientos', 'verde');
			$scope.mensajeSinMovimientos = 'No se encontraron movimientos del pedido';
			$scope.pedido = pedido;
			consultaReimpresionNotaServicios.obtenerDetalleEstado({pedido : pedido}).then(
				function(respuesta){
					mensajeServicio.cerrarIndicadorEsperaId(idIndicador);
					if(!respuesta.data.obtenerDetalleEstadoResult.EsError){
						$scope.listaMovimientos = respuesta.data.obtenerDetalleEstadoResult.ListaDetalleEstado;
						ngDialog.open({
							template: 'templates/DetalleEstadoPresupuesto.html',
							className: 'ngdialog-theme-plain',
							showClose: true,
							closeByDocument: false,
							closeByEscape: true,
							cache: false,
							scope: $scope
						});
					}else{
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: respuesta.data.obtenerDetalleEstadoResult.MensajeUsuario , msjTecnico : respuesta.data.obtenerDetalleEstadoResult.MensajeTecnico, clase: 'rojo'});
					}
				},
				function(error){
					mensajeServicio.cerrarIndicadorEsperaId(idIndicador);
					mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "Error al obtener detalle de movimientos", msjTecnico : error.status + " - " + error.statusText, clase: 'rojo'});
				}
			);
		}
		
		$scope.MostrarDetalleCliente = function (idNegocio, tienda, idCliente, digVer){
			var idIndicador = mensajeServicio.indicadorEspera('Obteniendo detalle del cliente', 'verde');
			consultaReimpresionNotaServicios.obtenerDetalleCliente({idNegocio : idNegocio, tienda : tienda, idCliente : idCliente, digVer : digVer}).then(
				function(respuesta){
					mensajeServicio.cerrarIndicadorEsperaId(idIndicador);
					if(!respuesta.data.obtenerDetalleClienteResult.EsError){
						$scope.detalleCliente = respuesta.data.obtenerDetalleClienteResult;
						ngDialog.open({
							template: 'templates/DetalleClientePresupuesto.html',
							className: 'ngdialog-theme-plain',
							showClose: true,
							closeByDocument: false,
							closeByEscape: true,
							cache: false,
							scope: $scope,
						});
					}else{
						mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: respuesta.data.obtenerDetalleClienteResult.MensajeUsuario , msjTecnico : respuesta.data.obtenerDetalleClienteResult.MensajeTecnico, clase: 'rojo'});
					}
				},
				function(error){
					mensajeServicio.cerrarIndicadorEsperaId(idIndicador);
					mensajeServicio.mensajeError({titulo: 'Error', msjUsuario: "Error al obtener detalle de cliente", msjTecnico : error.status + " - " + error.statusText, clase: 'rojo'});
				}
			);
		}
		
		$scope.jsonFechaFormato = function (fecha) {
			return $filter('date')(parseInt(fecha.substr(6)), 'dd/MM/yyyy hh:mm a')
		}

				/*Metodos para realizar la paginacion*/
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 10;
    $scope.elementosPaginados = [];
    $scope.paginaActual = 0;

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return String(haystack).toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.Respuesta.detBusquesa, function (item) {
            for (var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.paginaActual = 0;
        $scope.groupToPages();
    };

    $scope.groupToPages = function () {
        $scope.elementosPaginados = [];
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.elementosPaginados[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
            } else {
                $scope.elementosPaginados[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.rangoPaginacion = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.paginaAnterior = function () {
        if ($scope.paginaActual > 0) {
            $scope.paginaActual--;
        }
    };

    $scope.paginaSiguiente = function () {
        if ($scope.paginaActual < $scope.elementosPaginados.length - 1) {
            $scope.paginaActual++;
        }
    };

    $scope.setPage = function () {
        $scope.paginaActual = this.n;
    };

	/*Fin de paginador*/


// funcion para iniciar el tab de busqueda del cliente
		$scope.tabInicial = function () {
			var indicador = 0;
			

			return indicador;
		};

			$scope.setTab = function (tabAct) {
			$scope.tab = tabAct;
			/*if (tabAct === 0) {
				$scope.boolMostrarListaClientes = false;
			}*/
		};



$scope.ordenarPor = function (newSortingOrder, $event) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;
        $scope.sortingOrder = newSortingOrder;
        $('th i').each(function () {
			$(this).removeClass('fa fa-sort-up pl-rojo');
			$(this).removeClass('fa fa-sort-down pl-rojo');
            $(this).addClass('fa fa-sort');
        });

        if ($scope.reverse) 
            $($event.target).removeClass().addClass('fa fa-sort-up pl-rojo');
        else
            $($event.target).removeClass().addClass('fa fa-sort-down pl-rojo');
		
        $scope.search();
    };


		
	}



]);