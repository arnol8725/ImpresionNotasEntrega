app.service('mensajeServicio', function( ngDialog, $timeout ) {
	var indicador;
    this.indicadorEspera = function(texto, clase)
    {
			indicador = ngDialog.open({
						template: 'templates/MensajeServicioIndicadorEspera.html',
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

			return indicador.id;
    };

    this.cerrarIndicadorEspera = function()
    {
		$timeout(function(){
			if($("#"+indicador.id).length)
			{
				ngDialog.close( indicador.id );
			}
		},150);
    };

	this.cerrarIndicadorEsperaId = function(idDial)
    {
		$timeout(function(){
			if($("#"+idDial).length)
			{
				ngDialog.close( idDial );
			}
		},150);
    };

	this.mensajeError = function(mensaje)
    {
		var dialog = ngDialog.open({
                    template: 'templates/MensajeServicio.html',
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

     this.mensajeImpreison = function(mensaje)
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
