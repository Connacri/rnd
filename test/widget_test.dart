import 'package:flutter_test/flutter_test.dart';

import 'package:rnd_campaign_app/app/app.dart';

void main() {
  testWidgets('App renders login page', (WidgetTester tester) async {
    await tester.pumpWidget(const CampaignApp());
    expect(find.text('Se connecter'), findsOneWidget);
  });
}
