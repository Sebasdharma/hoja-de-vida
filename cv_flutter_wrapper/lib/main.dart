import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:webview_flutter_wkwebview/webview_flutter_wkwebview.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CvApp());
}

class CvApp extends StatelessWidget {
  const CvApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Jhoel Sebastian Reina Gordon - CV Flutter Wrapper',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.dark,
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFF6366F1),
        brightness: Brightness.light,
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: const Color(0xFF6366F1),
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0B0F19),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF111827),
          elevation: 0,
          foregroundColor: Colors.white,
        ),
      ),
      home: const CvWebViewScreen(),
    );
  }
}

class CvWebViewScreen extends StatefulWidget {
  const CvWebViewScreen({super.key});

  @override
  State<CvWebViewScreen> createState() => _CvWebViewScreenState();
}

class _CvWebViewScreenState extends State<CvWebViewScreen> {
  late final WebViewController _controller;
  int _loadingProgress = 0;
  bool _canGoBack = false;
  bool _canGoForward = false;

  @override
  void initState() {
    super.initState();

    // 1. Configuración de Plataforma (Android / iOS)
    late final PlatformWebViewControllerCreationParams params;
    if (WebViewPlatform.instance is WebKitWebViewPlatform) {
      params = WebKitWebViewControllerCreationParams(
        allowsInlineMediaPlayback: true,
        mediaTypesRequiringUserAction: const <PlaybackMediaTypes>{},
      );
    } else {
      params = const PlatformWebViewControllerCreationParams();
    }

    final WebViewController controller =
        WebViewController.fromPlatformCreationParams(params);

    // 2. Configurar Propiedades del WebViewController
    controller
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF0B0F19))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              _loadingProgress = progress;
            });
          },
          onPageStarted: (String url) {
            setState(() {
              _loadingProgress = 0;
            });
            _updateNavigationButtons();
          },
          onPageFinished: (String url) {
            setState(() {
              _loadingProgress = 100;
            });
            _updateNavigationButtons();
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('Error en WebView: ${error.description}');
          },
        ),
      )
      // 3. Cargar el HTML local desde los Assets del proyecto Flutter
      ..loadFlutterAsset('assets/web_cv/index.html');

    // 4. Optimizaciones específicas para Android
    if (controller.platform is AndroidWebViewController) {
      AndroidWebViewController.enableDebugging(true);
      (controller.platform as AndroidWebViewController)
          .setMediaPlaybackRequiresUserGesture(false);
    }

    _controller = controller;
  }

  Future<void> _updateNavigationButtons() async {
    final bool canGoBack = await _controller.canGoBack();
    final bool canGoForward = await _controller.canGoForward();
    if (mounted) {
      setState(() {
        _canGoBack = canGoBack;
        _canGoForward = canGoForward;
      });
    }
  }

  void _showInfoDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: const Color(0xFF111827),
          title: const Row(
            children: [
              Icon(Icons.info_outline, color: Color(0xFF6366F1)),
              SizedBox(width: 8),
              Text(
                'Detalles Académicos',
                style: TextStyle(color: Colors.white, fontSize: 18),
              ),
            ],
          ),
          content: const Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'TAREA 6: De Nativo Android a Despliegue Web Embed en Flutter',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF06B6D4),
                  fontSize: 14,
                ),
              ),
              SizedBox(height: 10),
              Text(
                'Estudiante: Jhoel Sebastian Reina Gordon',
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 13),
              ),
              Text(
                'Institución: Universidad Politécnica Estatal del Carchi (UPEC)',
                style: TextStyle(color: Colors.white70, fontSize: 12),
              ),
              Text(
                'Docente: PhD. Samuel Lascano Rivera',
                style: TextStyle(color: Colors.white70, fontSize: 12),
              ),
              SizedBox(height: 10),
              Text(
                'Arquitectura: Contenedor híbrido en Flutter con webview_flutter 4.7.0, renderizado de assets locales offline y controles de navegación en AppBar.',
                style: TextStyle(color: Colors.white60, fontSize: 12),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cerrar', style: TextStyle(color: Color(0xFF6366F1))),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: !_canGoBack,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        if (await _controller.canGoBack()) {
          await _controller.goBack();
          _updateNavigationButtons();
        }
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Jhoel Sebastian Reina Gordon',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
              ),
              Text(
                'UPEC • Flutter WebView Wrapper',
                style: TextStyle(fontSize: 11, color: Color(0xFF06B6D4)),
              ),
            ],
          ),
          actions: [
            // Botón Navegar Atrás Nativo
            IconButton(
              icon: const Icon(Icons.arrow_back_ios_new, size: 18),
              tooltip: 'Atrás en WebView',
              onPressed: _canGoBack
                  ? () async {
                      await _controller.goBack();
                      _updateNavigationButtons();
                    }
                  : null,
            ),
            // Botón Navegar Adelante Nativo
            IconButton(
              icon: const Icon(Icons.arrow_forward_ios, size: 18),
              tooltip: 'Adelante en WebView',
              onPressed: _canGoForward
                  ? () async {
                      await _controller.goForward();
                      _updateNavigationButtons();
                    }
                  : null,
            ),
            // Botón Recargar Nativo
            IconButton(
              icon: const Icon(Icons.refresh),
              tooltip: 'Recargar página',
              onPressed: () {
                _controller.reload();
              },
            ),
            // Botón Información Nativo
            IconButton(
              icon: const Icon(Icons.info_outline),
              tooltip: 'Información Técnica UPEC',
              onPressed: _showInfoDialog,
            ),
          ],
          bottom: _loadingProgress < 100
              ? PreferredSize(
                  preferredSize: const Size.fromHeight(3.0),
                  child: LinearProgressIndicator(
                    value: _loadingProgress / 100.0,
                    backgroundColor: Colors.transparent,
                    valueColor: const AlwaysStoppedAnimation<Color>(
                      Color(0xFF6366F1),
                    ),
                  ),
                )
              : null,
        ),
        body: WebViewWidget(controller: _controller),
      ),
    );
  }
}
