var arr_indicador = [];
var removeItemFromArr = ( arr, item ) => {
	var i = arr.indexOf( item );
	i !== -1 && arr.splice( i, 1 );
};

app.service('mensajeServicio', function( ngDialog, $timeout ) {
	var id_msg;
	var indicador;
    this.indicadorEspera = function(texto, clase)
    {
		indicador = ngDialog.open({
					template: 'Templates/MensajeServicioIndicadorEspera.html',
					className: 'ngdialog-theme-plain',
					showClose: false,
					closeByDocument: false,
					closeByEscape: false,
					cache: false,
					width: '100%',
					controller: ['$scope', function($scope) {
									$scope.msg = texto;
									$scope.clase = clase;
								}]
				});
		
		arr_indicador.push(indicador.id);
		return indicador.id;
    };

    this.cerrarIndicadorEspera = function()
    {
		$timeout(function(){
			if(arr_indicador.length > 0 && ngDialog.isOpen(arr_indicador[0]))
			{
				ngDialog.close( arr_indicador[0] );
				arr_indicador.splice(0, 1);
			}
		},150);
    };
	
	this.cerrarIndicadorEsperaId = function(idDial)
    {	
		$timeout(function(){
			if(ngDialog.isOpen(idDial))
			{
				ngDialog.close( idDial );
				removeItemFromArr(arr_indicador, idDial);
			}
		},150);
    };
	
	this.mensajeError = function(mensaje)
    {	
		var dialog = ngDialog.open({
                    template: 'Templates/MensajeServicio.html',
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
								}]
                });
				
		return dialog;
    };
	  
	this.numEmpSinT = function(numEmp)
    {	
		return numEmp.replace(/\D/gi, '');
    };
});
