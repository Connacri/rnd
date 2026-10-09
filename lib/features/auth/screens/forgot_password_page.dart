import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/core/constants/app_constants.dart';
import 'package:rnd_campaign_app/core/utils/validators.dart';
import 'package:rnd_campaign_app/features/auth/providers/auth_provider.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';
import 'package:rnd_campaign_app/widgets/language_switcher.dart';

class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({super.key});

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  bool _sent = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final auth = context.read<AuthProvider>();
    final l = AppLocalizations.of(context)!;
    final success = await auth.resetPassword(_emailController.text.trim());

    if (!mounted) return;

    if (success) {
      setState(() => _sent = true);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(auth.error ?? l.loginError)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final l = AppLocalizations.of(context)!;

    return Scaffold(
      backgroundColor: const Color(0xFF0a1628),
      appBar: AppBar(title: Text(l.forgotPasswordTitle)),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: _sent
                ? _SentConfirmation(email: _emailController.text.trim())
                : Form(
                    key: _formKey,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const LanguageSwitcher(),
                        const SizedBox(height: 24),
                        Text(
                          AppConstants.appName,
                          style: Theme.of(context)
                              .textTheme
                              .headlineMedium
                              ?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          l.forgotPasswordHint,
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: Colors.white70),
                        ),
                        const SizedBox(height: 32),
                        TextFormField(
                          controller: _emailController,
                          decoration: InputDecoration(
                            labelText: l.email,
                            prefixIcon: const Icon(Icons.email_outlined),
                          ),
                          keyboardType: TextInputType.emailAddress,
                          validator: Validators.email,
                        ),
                        const SizedBox(height: 24),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: auth.isLoading ? null : _submit,
                            child: auth.isLoading
                                ? const CircularProgressIndicator()
                                : Text(l.sendResetEmail),
                          ),
                        ),
                      ],
                    ),
                  ),
          ),
        ),
      ),
    );
  }
}

class _SentConfirmation extends StatelessWidget {
  const _SentConfirmation({required this.email});

  final String email;

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.mark_email_read_outlined,
            size: 72, color: Colors.white70),
        const SizedBox(height: 24),
        Text(
          l.resetEmailSent,
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.white, fontSize: 16),
        ),
        const SizedBox(height: 8),
        Text(
          email,
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.white70),
        ),
        const SizedBox(height: 32),
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text(l.login, style: const TextStyle(color: Colors.white)),
        ),
      ],
    );
  }
}
