import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/core/utils/validators.dart';
import 'package:rnd_campaign_app/features/auth/providers/auth_provider.dart';
import 'package:rnd_campaign_app/features/membership/providers/membership_provider.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';

class MembershipFormPage extends StatefulWidget {
  const MembershipFormPage({super.key});

  @override
  State<MembershipFormPage> createState() => _MembershipFormPageState();
}

class _MembershipFormPageState extends State<MembershipFormPage> {
  final _formKey = GlobalKey<FormState>();
  final _nomController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _ageController = TextEditingController();
  final _professionController = TextEditingController();
  final _adresseController = TextEditingController();
  final _messageController = TextEditingController();
  final _suggestionController = TextEditingController();

  @override
  void dispose() {
    _nomController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _ageController.dispose();
    _professionController.dispose();
    _adresseController.dispose();
    _messageController.dispose();
    _suggestionController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final auth = context.read<AuthProvider>();
    final membership = context.read<MembershipProvider>();
    final l = AppLocalizations.of(context)!;

    if (auth.user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(l.loginRequired)),
      );
      Navigator.pushNamed(context, AppRoutes.login);
      return;
    }

    final success = await membership.submitMembership(
      userId: auth.user!.id,
      fullName: _nomController.text.trim(),
      email: _emailController.text.trim(),
      phone: _phoneController.text.trim(),
      address: _adresseController.text.trim().isEmpty
          ? null
          : _adresseController.text.trim(),
      city: _professionController.text.trim().isEmpty
          ? null
          : _professionController.text.trim(),
      wilaya: null,
    );

    if (!mounted) return;

    if (success) {
      final l2 = AppLocalizations.of(context)!;
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: Text(l2.thankYou),
          content: Text(l2.successMessage),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final membership = context.watch<MembershipProvider>();
    final l = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(l.membership),
        backgroundColor: const Color(0xFF0a1628),
        foregroundColor: Colors.white,
      ),
      backgroundColor: const Color(0xFF0a1628),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                l.membershipTitle,
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                l.membershipDesc,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.white.withValues(alpha: 0.6),
                ),
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _nomController,
                decoration: _inputDecoration(l.nom, l.namePlaceholder),
                style: const TextStyle(color: Colors.white),
                validator: (v) =>
                    v == null || v.isEmpty ? l.nomRequired : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _emailController,
                decoration: _inputDecoration(l.emailField, l.emailPlaceholder),
                keyboardType: TextInputType.emailAddress,
                style: const TextStyle(color: Colors.white),
                validator: Validators.email,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _phoneController,
                decoration: _inputDecoration(l.phone, l.phonePlaceholder),
                keyboardType: TextInputType.phone,
                style: const TextStyle(color: Colors.white),
                validator: Validators.phone,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _ageController,
                decoration: _inputDecoration(l.ageOptional, l.agePlaceholder),
                keyboardType: TextInputType.number,
                style: const TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _professionController,
                decoration: _inputDecoration(l.professionOptional, l.professionPlaceholder),
                style: const TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _adresseController,
                decoration: _inputDecoration(l.addressOptional, l.addressPlaceholder),
                style: const TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _messageController,
                decoration: _inputDecoration(l.messageOptional, l.messagePlaceholder),
                maxLines: 3,
                style: const TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _suggestionController,
                decoration: _inputDecoration(l.suggestionOptional, l.suggestionPlaceholder),
                maxLines: 3,
                style: const TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: membership.isLoading ? null : _submit,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF00d4ff),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: membership.isLoading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : Text(
                          l.send,
                          style: const TextStyle(
                            fontWeight: FontWeight.w700,
                            fontSize: 16,
                          ),
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  InputDecoration _inputDecoration(String label, String placeholder) {
    return InputDecoration(
      labelText: label,
      labelStyle: TextStyle(color: Colors.white.withValues(alpha: 0.6)),
      hintText: placeholder,
      hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3)),
      filled: true,
      fillColor: Colors.white.withValues(alpha: 0.05),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.15)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.15)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Color(0xFF00d4ff)),
      ),
    );
  }
}
